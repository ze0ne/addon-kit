import React, {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Result } from "src/types";
import { AddonPanel } from "storybook/internal/components";
import { Button, Placeholder, TabsState } from "storybook/internal/components";
import {
  useAddonState,
  useArgs,
  useArgTypes,
  useChannel,
} from "storybook/internal/manager-api";
import { styled, useTheme } from "storybook/internal/theming";

import { EVENTS } from "../constants";
import { List } from "./List";
import { get } from "http";
import { getOpenAiResponse } from "src/opanAi";

interface PanelProps {
  active: boolean;
}

export const RequestDataButton = styled(Button)({
  marginTop: "1rem",
});

function generateContextJson(args: any, argTypes: any): any {
  if (!args || !argTypes) return "{}";
  const properties = Object.keys(argTypes).map((key) => {
    const argType = argTypes[key];
    // On ne garde que des valeurs simples pour le JSON
    return {
      name: key,
      defaultValue: argType.table?.defaultValue?.summary
        ? argType.table.defaultValue.summary.replace(/^['"]|['"]$/g, "")
        : null, // Suppression des caractères d'échappement
      value: args[key]
        ? args[key].toString().replace(/\\\"/g, '"').replace(/\\'/g, "'")
        : null,
      type: argType.type?.name || "unknown",
      required: !!argType.type?.required,
      description: argType.description || "",
      control:
        typeof argType.control === "string"
          ? argType.control
          : argType.control?.type || null,
    };
  });

  try {
    return properties;
  } catch (e) {
    return '{"error":"Could not serialize context"}';
  }
}

export const Panel: React.FC<PanelProps> = memo(function MyPanel(props) {
  const [contextJson, setContextJson] = useState<string>("{}");
  const [args, updateArgs] = useArgs();
  const argTypes = useArgTypes();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const prompt = textareaRef.current?.value ?? "";
    generateData(contextJson, prompt);
  };

  useEffect(() => {
    const json = generateContextJson(args, argTypes);
    setContextJson(json);
  }, [args, argTypes]);

  const [state, setState] = useState<{
    divs: any[];
    styled: any[];
    overrideTitle?: string;
  }>({
    divs: [],
    styled: [],
    overrideTitle: undefined,
  });

  const [userPrompt, setUserPrompt] = useState<string>("");

  const { divs, styled, overrideTitle } = state;

  const theme = useTheme();

  const UserPromptForm = React.memo(
    ({ contextJson, onSubmit, userPrompt, onPromptChange }) => (
      <form onSubmit={handleSubmit} style={{ margin: "1.5rem 0" }}>
        <label
          htmlFor="user-prompt"
          style={{
            fontWeight: "bold",
            display: "block",
            marginBottom: "0.5rem",
          }}
        >
          Prompt personnalisé :
        </label>
        <textarea
          id="user-prompt"
          defaultValue=""
          rows={4}
          ref={textareaRef}
          style={{
            width: "100%",
            padding: "0.75rem",
            fontSize: "1rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
            marginBottom: "1rem",
            fontFamily: "inherit",
            resize: "vertical",
          }}
          placeholder="Écrivez ici votre prompt comme sur ChatGPT..."
        />
        <RequestDataButton type="submit">
          Générer avec mon prompt
        </RequestDataButton>
      </form>
    ),
  );

  // https://storybook.js.org/docs/react/addons/addons-api#usechannel
  const emit = useChannel({
    [EVENTS.RESULT]: (newResults) => {
      setState(newResults);
    },
  });

  const generateData = useCallback(
    (schema: any, prompt?: string) => {
      // Générer le JSON de contexte
      const mapping = `Voici des informations sur les propriétés du composant pour t'aider à générer un contenu pertinent, garde bien la même structure et le même nom pour chaque proprité, le mapping doit être identique :\n\n${schema}`;
      // const message = `Tu es rédacteur de blog et tu dois écrire un article complet (2000 mots) sur sur un sujet tech (développement informatique). Tu dois rédiger en français.${mapping}`;
      const message = `Tu es un générateur de contenu pour des composants frontend :\n\n${mapping}`;
      const userPrompt = prompt ? `${prompt}${mapping}` : message;
      getOpenAiResponse({
        schema,
        maxTokens: 2000,
        customPrompt: prompt,
      }).then((response: any) => {
        updateArgs(response);
      });
      emit(EVENTS.REQUEST);
    },
    [emit],
  );

  return (
    <AddonPanel {...props}>
      <TabsState
        initial="overview"
        backgroundColor={theme.background.hoverable}
      >
        <div id="overview" title="Properties" color={theme.color.positive}>
          {
            <Placeholder>
              <Fragment>
                <div>
                  {/* Ajout du formulaire de prompt utilisateur */}
                  <UserPromptForm
                    contextJson={contextJson}
                    userPrompt={userPrompt}
                    onPromptChange={(e) => setUserPrompt(e.target.value)}
                    onSubmit={(e) => {
                      e.preventDefault();
                      generateData(contextJson, userPrompt);
                    }}
                  />
                </div>
                <div>
                  <h2>Propriétés du composant actuel :</h2>
                  <div>
                    <div style={{ overflowX: "auto", marginTop: "1rem" }}>
                      <table
                        style={{
                          width: "100%",
                          borderCollapse: "collapse",
                          borderRadius: "8px",
                          overflow: "hidden",
                          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                          fontFamily: "Arial, sans-serif",
                          color: "#333",
                        }}
                      >
                        <thead>
                          <tr
                            style={{
                              backgroundColor: "#6200ea",
                              color: "#fff",
                              textAlign: "left",
                            }}
                          >
                            <th style={{ padding: "1rem", fontWeight: "bold" }}>
                              Property
                            </th>
                            <th style={{ padding: "1rem", fontWeight: "bold" }}>
                              Value
                            </th>
                            <th style={{ padding: "1rem", fontWeight: "bold" }}>
                              Type
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {args &&
                            Object.keys(args).map((key, index) => (
                              <tr
                                key={key}
                                style={{
                                  backgroundColor:
                                    index % 2 === 0 ? "#f9f9f9" : "#fff",
                                  borderBottom: "1px solid #ddd",
                                  transition: "background-color 0.3s",
                                }}
                                onMouseEnter={(e) =>
                                  (e.currentTarget.style.backgroundColor =
                                    "#e0e0e0")
                                }
                                onMouseLeave={(e) =>
                                  (e.currentTarget.style.backgroundColor =
                                    index % 2 === 0 ? "#f9f9f9" : "#fff")
                                }
                              >
                                <td style={{ padding: "1rem" }}>{key}</td>
                                <td style={{ padding: "1rem" }}>{args[key]}</td>
                                <td style={{ padding: "1rem" }}>
                                  {argTypes[key]?.type?.name || "unknown"}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </Fragment>
              <Fragment>
                <RequestDataButton onClick={() => generateData(contextJson)}>
                  Play with OpenAI
                </RequestDataButton>
              </Fragment>
            </Placeholder>
          }
        </div>
        <div
          id="settings"
          title="Settings"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f4f4f4",
          }}
        >
          <Placeholder>
            <div
              style={{
                padding: "2rem",
                width: "100%",
                maxWidth: "500px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#fff",
              }}
            >
              <h2
                style={{
                  fontSize: "1.8rem",
                  fontWeight: "bold",
                  marginBottom: "1.5rem",
                  color: "#333",
                  textAlign: "center",
                }}
              >
                Configuration
              </h2>
              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  htmlFor="openai-key"
                  style={{
                    display: "block",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    marginBottom: "0.5rem",
                    color: "#555",
                  }}
                >
                  OpenAI API Key
                </label>
                <input
                  id="openai-key"
                  type="text"
                  value={state.openAiKey || ""}
                  onChange={(e) =>
                    setState({ ...state, openAiKey: e.target.value })
                  }
                  placeholder="**********************************"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    fontSize: "1rem",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    outline: "none",
                    transition: "border-color 0.3s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#6200ea")}
                  onBlur={(e) => (e.target.style.borderColor = "#ccc")}
                />
                <label
                  htmlFor="openai-model"
                  style={{
                    display: "block",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    marginBottom: "0.5rem",
                    color: "#555",
                  }}
                >
                  Modèle ChatGPT
                </label>
                <select
                  id="openai-model"
                  value="gpt-3.5-turbo"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    fontSize: "1rem",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    outline: "none",
                    marginBottom: "1rem",
                    transition: "border-color 0.3s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#6200ea")}
                  onBlur={(e) => (e.target.style.borderColor = "#ccc")}
                >
                  <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
                  <option value="gpt-4">gpt-4</option>
                  <option value="gpt-4-turbo">gpt-4-turbo</option>
                  <option value="gpt-4o">gpt-4o</option>
                </select>
              </div>
              <button
                onClick={() => {
                  localStorage.setItem("openAiKey", state.openAiKey || "");
                }}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "0.75rem",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  color: "#fff",
                  backgroundColor: "#6200ea",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#4500b5")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#6200ea")
                }
              >
                Save configuration
              </button>
            </div>
          </Placeholder>
        </div>
      </TabsState>
    </AddonPanel>
  );
});
