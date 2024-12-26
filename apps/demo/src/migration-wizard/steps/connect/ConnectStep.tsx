import React, { useCallback, useEffect, useState } from "react";
import {
  Stack,
  StackItem,
  TextContent,
  Text,
  Panel,
  PanelMain,
  PanelHeader,
  List,
  OrderType,
  ListItem,
  Icon,
  Alert,
  AlertActionLink,
  Button,
} from "@patternfly/react-core";
import { chart_color_blue_300 as blueColor } from "@patternfly/react-tokens/dist/esm/chart_color_blue_300";
import { ClusterIcon, PlusCircleIcon } from "@patternfly/react-icons";
import { SourcesTable } from "#/migration-wizard/steps/connect/sources-table/SourcesTable";
import { useDiscoverySources } from "#/migration-wizard/contexts/discovery-sources/Context";
import { DiscoverySourceSetupModal } from "./sources-table/empty-state/DiscoverySourceSetupModal";

export const ConnectStep: React.FC = () => {
  const discoverySourcesContext = useDiscoverySources();
  const [
    shouldShowDiscoverySourceSetupModal,
    setShouldShowDiscoverySetupModal,
  ] = useState(false);

  const toggleDiscoverySourceSetupModal = useCallback((): void => {
    setShouldShowDiscoverySetupModal((lastState) => !lastState);
  }, []);
  const hasSources = discoverySourcesContext.sources.length > 0;
  const [firstSource, ..._otherSources] = discoverySourcesContext.sources;
  
  useEffect(() => {
    if (!discoverySourcesContext.sourceSelected && firstSource) {
      discoverySourcesContext.selectSource(firstSource);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstSource]);

  return (
    <Stack hasGutter>
      <StackItem>
        <TextContent>
          <Text component="h2">Connect your VMware environment</Text>
        </TextContent>
      </StackItem>
      <StackItem>
        <TextContent style={{ paddingBlock: "1rem" }}>
          <Text component="h4">
            Follow these steps to connect your environment and start the
            discovery process
          </Text>
          <List
            component="ol"
            type={OrderType.number}
            style={{ marginInlineStart: 0 }}
          >
            <ListItem>
              A link will appear below once the VM is running. Use this link to
              enter credentials and connect your environment.
            </ListItem>
            <ListItem>
              When the connection is established, you will be able to proceed
              and see the discovery report.
            </ListItem>
          </List>
        </TextContent>
        {discoverySourcesContext.sourceSelected?.status ===
          "waiting-for-credentials" && (
          <Alert
            isInline
            variant="custom"
            title="Discovery VM"
            actionLinks={
              <AlertActionLink
                component="a"
                href={discoverySourcesContext.sourceSelected?.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {discoverySourcesContext.sourceSelected?.credentialUrl}
              </AlertActionLink>
            }
          >
            <TextContent>
              <Text>
                Click the link below to connect the Discovery Source to your
                VMware environment.
              </Text>
            </TextContent>
          </Alert>
        )}
      </StackItem>
      <StackItem>
        <Panel variant="bordered">
          <PanelMain>
            <PanelHeader style={{ paddingBlockEnd: 0 }}>
              <TextContent>
                <Text component="h3">
                  <Icon isInline style={{ marginRight: "1rem" }}>
                    <ClusterIcon />
                  </Icon>
                  Environment
                </Text>
              </TextContent>
            </PanelHeader>
            <SourcesTable />
          </PanelMain>
        </Panel>
      </StackItem>
      <StackItem>
        {hasSources && (
          <Button
            variant="secondary"
            onClick={toggleDiscoverySourceSetupModal}
            style={{ marginTop: "1rem" }}
            icon={<PlusCircleIcon color={blueColor.value} />}
          >
            Add source
          </Button>
        )}
        {shouldShowDiscoverySourceSetupModal && (
          <DiscoverySourceSetupModal
            isOpen={shouldShowDiscoverySourceSetupModal}
            onClose={toggleDiscoverySourceSetupModal}
            isDisabled={discoverySourcesContext.isDownloadingSource}
            onSubmit={async (event) => {
              const form = event.currentTarget;
              const name = form["discoverySourceName"].value as string;
              const sshKey = form["discoverySourceSshKey"].value as string;
              await discoverySourcesContext.downloadSource(name, sshKey);
              toggleDiscoverySourceSetupModal();
              await discoverySourcesContext.listSources();
            }}
          />
        )}
      </StackItem>
      <StackItem>
        {discoverySourcesContext.errorDownloadingSource && (
          <Alert isInline variant="danger" title="Download Source error" />
        )}
      </StackItem>
    </Stack>
  );
};

ConnectStep.displayName = "ConnectStep";
