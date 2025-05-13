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
      const message = `Tu es rédacteur de blog et tu dois écrire un article complet (2000 mots) sur l'esport CS2 Vitality et ses derniers résultats et rapport avec l'actuatualité esport de Counter Strike 2, tu dois donner des éléménts récents sur l'esport et des tendances actuelles dans le jeu. Voici des informations sur les propriétés du composant pour t'aider à générer un contenu pertinent, garde bien la même structure et le même nom pour chaque proprité, le mapping doit être identique :\n\n${data}`;

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
        <div id="overview" title="Overview" color={theme.color.positive}>
          {
            <Placeholder>
              <Fragment>
                <div>
                  <h2>Propriétés du composant actuel :</h2>
                  <div>
                    <h2>Propriétés du composant actuel :</h2>
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
          id="div"
          title={`${divs.length} Divs`}
          color={theme.color.negative}
        >
          {divs.length > 0 ? (
            <Placeholder>
              <p>The following divs have less than 2 childNodes</p>
              <List
                items={divs.map((item, index) => ({
                  title: `item #${index}`,
                  description: JSON.stringify(item, null, 2),
                }))}
              />
            </Placeholder>
          ) : (
            <Placeholder>
              <p>No divs found</p>
            </Placeholder>
          )}
        </div>
        <div
          id="all"
          title={`${styled.length} All`}
          color={theme.color.warning}
        >
          {styled.length > 0 ? (
            <Placeholder>
              <p>The following elements have a style attribute</p>
              <List
                items={styled.map((item, index) => ({
                  title: `item #${index}`,
                  description: JSON.stringify(item, null, 2),
                }))}
              />
            </Placeholder>
          ) : (
            <Placeholder>
              <p>No styled elements found</p>
            </Placeholder>
          )}
        </div>
      </TabsState>
    </AddonPanel>
  );
});
