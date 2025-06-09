import React, {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useMemo,
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

function generateContextJson(args: any, argTypes: any): string {
  if (!args || !argTypes) return "{}";

  const properties = Object.keys(argTypes).map((key) => {
    const argType = argTypes[key];
    return {
      name: key,
      type: argType.type?.name || "unknown",
      required: argType.type?.required || false,
      description: argType.description || "",
      control: argType.control || null,
      defaultValue: argType.table?.defaultValue?.summary || null,
    };
  });

  const contextJson = {
    context:
      "This JSON provides metadata about the properties of a component to help generate meaningful content.",
    properties,
  };

  return JSON.stringify(contextJson, null, 2);
}

export const Panel: React.FC<PanelProps> = memo(function MyPanel(props) {
  console.log("Panel props", props);
  const [contextJson, setContextJson] = useState<string>("{}");
  const [args, updateArgs] = useArgs();
  const argTypes = useArgTypes();
  console.log("argTypes", argTypes);

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

  const { divs, styled, overrideTitle } = state;

  const theme = useTheme();

  // https://storybook.js.org/docs/react/addons/addons-api#usechannel
  const emit = useChannel({
    [EVENTS.RESULT]: (newResults) => {
      setState(newResults);
    },
  });

  const genetateData = useCallback(
    (data: string) => {
      // Générer le JSON de contexte
      const message = `Tu es rédacteur de blog et tu dois écrire un article complet (2000 mots) sur sur un sujet tech (développement informatique). Tu dois rédiger en français. Voici des informations sur les propriétés du composant pour t'aider à générer un contenu pertinent, garde bien la même structure et le même nom pour chaque proprité, le mapping doit être identique :\n\n${data}`;

      console.log("Requesting data", EVENTS);
      getOpenAiResponse({
        userPrompt: message,
        maxTokens: 2000,
      }).then((response: any) => {
        console.log("Response from OpenAI:", response);

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
                <RequestDataButton onClick={() => genetateData(contextJson)}>
                  genetateData
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
                placeholder="Enter your OpenAI API key"
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
            </div>
            <button
              onClick={() => {
                localStorage.setItem("openaiKey", state.openAiKey || "");
                alert("OpenAI API Key saved!");
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
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#4500b5")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#6200ea")}
            >
              Save Key
            </button>
          </div>
        </div>
      </TabsState>
    </AddonPanel>
  );
});
