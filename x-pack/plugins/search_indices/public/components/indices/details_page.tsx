/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import {
  EuiPageSection,
  EuiButton,
  EuiPageTemplate,
  EuiFlexItem,
  EuiFlexGroup,
  EuiButtonEmpty,
  EuiTabbedContent,
  EuiTabbedContentTab,
} from '@elastic/eui';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormattedMessage } from '@kbn/i18n-react';
import { i18n } from '@kbn/i18n';
import { SectionLoading } from '@kbn/es-ui-shared-plugin/public';
import { useIndex } from '../../hooks/api/use_index';
import { useKibana } from '../../hooks/use_kibana';
import { ConnectionDetails } from '../connection_details/connection_details';
import { QuickStats } from '../quick_stats/quick_stats';
import { useIndexMapping } from '../../hooks/api/use_index_mappings';
import { IndexDocuments } from '../index_documents/index_documents';
import { DeleteIndexModal } from './delete_index_modal';
import { IndexloadingError } from './details_page_loading_error';
import { SearchIndexDetailsTabs } from '../../routes';
import { SearchIndexDetailsMappings } from './details_page_mappings';
import { SearchIndexDetailsSettings } from './details_page_settings';
import { SearchIndexDetailsPageMenuItemPopover } from './details_page_menu_item';
import { useIndexDocumentSearch } from '../../hooks/api/use_document_search';
import { DEFAULT_PAGE_SIZE } from '../index_documents/constants';

export const SearchIndexDetailsPage = () => {
  const indexName = decodeURIComponent(useParams<{ indexName: string }>().indexName);
  const tabId = decodeURIComponent(useParams<{ tabId: string }>().tabId);

  const { console: consolePlugin, docLinks, application, history, share } = useKibana().services;
  const {
    data: index,
    refetch,
    isError: isIndexError,
    isInitialLoading,
    error: indexLoadingError,
  } = useIndex(indexName);

  const {
    data: mappings,
    isError: isMappingsError,
    isInitialLoading: isMappingsInitialLoading,
    error: mappingsError,
  } = useIndexMapping(indexName);
  const { data: indexDocuments, isInitialLoading: indexDocumentsIsInitialLoading } =
    useIndexDocumentSearch(indexName, {
      pageSize: DEFAULT_PAGE_SIZE,
      pageIndex: 0,
    });
  const docs = indexDocuments?.results?.data ?? [];

  const playgroundOnClick = useCallback(async () => {
    const playgroundLocator = share.url.locators.get('PLAYGROUND_LOCATOR_ID');
    if (playgroundLocator && index) {
      playgroundLocator.navigate({ 'default-index': index.name });
    }
  }, [share, index]);
  const detailsPageTabs: EuiTabbedContentTab[] = useMemo(() => {
    return [
      {
        id: SearchIndexDetailsTabs.DATA,
        name: i18n.translate('xpack.searchIndices.documentsTabLabel', {
          defaultMessage: 'Data',
        }),
        content: (
          <IndexDocuments
            indexName={indexName}
            indexDocuments={indexDocuments}
            isInitialLoading={indexDocumentsIsInitialLoading}
          />
        ),
        'data-test-subj': `${SearchIndexDetailsTabs.DATA}Tab`,
      },
      {
        id: SearchIndexDetailsTabs.MAPPINGS,
        name: i18n.translate('xpack.searchIndices.mappingsTabLabel', {
          defaultMessage: 'Mappings',
        }),
        content: <SearchIndexDetailsMappings index={index} />,
        'data-test-subj': `${SearchIndexDetailsTabs.MAPPINGS}Tab`,
      },
      {
        id: SearchIndexDetailsTabs.SETTINGS,
        name: i18n.translate('xpack.searchIndices.settingsTabLabel', {
          defaultMessage: 'Settings',
        }),
        content: <SearchIndexDetailsSettings indexName={indexName} />,
        'data-test-subj': `${SearchIndexDetailsTabs.SETTINGS}Tab`,
      },
    ];
  }, [index, indexName, indexDocuments, indexDocumentsIsInitialLoading]);
  const [selectedTab, setSelectedTab] = useState(detailsPageTabs[0]);

  useEffect(() => {
    const newTab = detailsPageTabs.find((tab) => tab.id === tabId);
    if (newTab) setSelectedTab(newTab);
  }, [detailsPageTabs, tabId]);

  const handleTabClick = useCallback(
    (tab: EuiTabbedContentTab) => {
      history.push(`index_details/${indexName}/${tab.id}`);
    },

    [history, indexName]
  );
  const embeddableConsole = useMemo(
    () => (consolePlugin?.EmbeddableConsole ? <consolePlugin.EmbeddableConsole /> : null),
    [consolePlugin]
  );
  const navigateToIndexListPage = useCallback(() => {
    application.navigateToApp('management', { deepLinkId: 'index_management' });
  }, [application]);

  const refetchIndex = useCallback(() => {
    refetch();
  }, [refetch]);
  const indexError = useMemo(
    () =>
      isIndexError
        ? {
            title: indexLoadingError ? indexLoadingError.body?.error : '',
            message: indexLoadingError ? indexLoadingError.body?.message : '',
          }
        : {
            title: mappingsError ? mappingsError.body?.error : '',
            message: mappingsError ? mappingsError.body?.message : '',
          },
    [isIndexError, indexLoadingError, mappingsError]
  );

  const [isShowingDeleteModal, setShowDeleteIndexModal] = useState<boolean>(false);
  const handleDeleteIndexModal = useCallback(() => {
    setShowDeleteIndexModal(!isShowingDeleteModal);
  }, [isShowingDeleteModal]);

  if (isInitialLoading || isMappingsInitialLoading) {
    return (
      <SectionLoading>
        {i18n.translate('xpack.searchIndices.loadingDescription', {
          defaultMessage: 'Loading index details…',
        })}
      </SectionLoading>
    );
  }

  return (
    <EuiPageTemplate
      offset={0}
      restrictWidth={false}
      data-test-subj="searchIndicesDetailsPage"
      grow={false}
      panelled
      bottomBorder
    >
      {isIndexError || isMappingsError || !index || !mappings ? (
        <IndexloadingError
          error={indexError}
          navigateToIndexListPage={navigateToIndexListPage}
          reloadFunction={refetchIndex}
        />
      ) : (
        <>
          <EuiPageSection>
            <EuiButton
              data-test-subj="backToIndicesButton"
              color="text"
              iconType="arrowLeft"
              onClick={() => navigateToIndexListPage()}
            >
              <FormattedMessage
                id="xpack.searchIndices.backToIndicesButtonLabel"
                defaultMessage="Back to indices"
              />
            </EuiButton>
          </EuiPageSection>
          <EuiPageTemplate.Header
            data-test-subj="searchIndexDetailsHeader"
            pageTitle={index?.name}
            rightSideItems={[
              <EuiFlexGroup gutterSize="none">
                <EuiFlexItem>
                  {!indexDocumentsIsInitialLoading && docs.length === 0 ? (
                    <EuiButtonEmpty
                      href={docLinks.links.apiReference}
                      target="_blank"
                      iconType="documentation"
                      data-test-subj="ApiReferenceDoc"
                    >
                      {i18n.translate('xpack.searchIndices.indexActionsMenu.apiReference.docLink', {
                        defaultMessage: 'API Reference',
                      })}
                    </EuiButtonEmpty>
                  ) : (
                    <EuiButtonEmpty
                      onClick={playgroundOnClick}
                      target="_blank"
                      iconType="launch"
                      data-test-subj="useInPlaygroundLink"
                    >
                      {i18n.translate('xpack.searchIndices.moreOptions.playgroundLabel', {
                        defaultMessage: 'Use in Playground',
                      })}
                    </EuiButtonEmpty>
                  )}
                </EuiFlexItem>
                <EuiFlexItem>
                  <SearchIndexDetailsPageMenuItemPopover
                    handleDeleteIndexModal={handleDeleteIndexModal}
                    playgroundOnClick={playgroundOnClick}
                  />
                </EuiFlexItem>
              </EuiFlexGroup>,
            ]}
          />
          <EuiPageTemplate.Section grow={false}>
            <EuiFlexGroup direction="column">
              <EuiFlexItem>
                <EuiFlexGroup>
                  <EuiFlexItem>
                    <ConnectionDetails />
                  </EuiFlexItem>
                  <EuiFlexItem>{/* TODO: API KEY */}</EuiFlexItem>
                </EuiFlexGroup>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiFlexGroup>
                  <QuickStats index={index} mappings={mappings} />
                </EuiFlexGroup>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiFlexItem>
                  <EuiTabbedContent
                    tabs={detailsPageTabs}
                    onTabClick={handleTabClick}
                    selectedTab={selectedTab}
                  />
                </EuiFlexItem>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPageTemplate.Section>
        </>
      )}
      {isShowingDeleteModal && (
        <DeleteIndexModal
          onCancel={() => setShowDeleteIndexModal(!isShowingDeleteModal)}
          indexName={indexName}
          navigateToIndexListPage={navigateToIndexListPage}
        />
      )}
      {embeddableConsole}
    </EuiPageTemplate>
  );
};
