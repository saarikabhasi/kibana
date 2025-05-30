/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { getListItemResponseMock } from '../../../common/schemas/response/list_item_schema.mock';
import { LIST_ITEM_ID, LIST_ITEM_INDEX } from '../../../common/constants.mock';

import { getListItem } from './get_list_item';
import { deleteListItem } from './delete_list_item';
import { getDeleteListItemOptionsMock } from './delete_list_item.mock';

jest.mock('./get_list_item', () => ({
  getListItem: jest.fn(),
}));

describe('delete_list_item', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Delete returns a null if "getListItem" returns a null', async () => {
    (getListItem as unknown as jest.Mock).mockResolvedValueOnce(null);
    const options = getDeleteListItemOptionsMock();
    const deletedListItem = await deleteListItem(options);
    expect(deletedListItem).toEqual(null);
  });

  test('Delete returns the same list item if a list item is returned from "getListItem"', async () => {
    const listItem = getListItemResponseMock();
    (getListItem as unknown as jest.Mock)
      .mockResolvedValueOnce(listItem)
      .mockResolvedValueOnce(null);
    const options = getDeleteListItemOptionsMock();
    (options.esClient.deleteByQuery as unknown as jest.Mock).mockResolvedValueOnce({
      deleted: true,
    });
    const deletedListItem = await deleteListItem(options);
    expect(deletedListItem).toEqual(listItem);
  });

  test('Delete calls "deleteByQuery" if a list item is returned from "getListItem"', async () => {
    const listItem = getListItemResponseMock();
    (getListItem as unknown as jest.Mock)
      .mockResolvedValueOnce(listItem)
      .mockResolvedValueOnce(null);
    const options = getDeleteListItemOptionsMock();
    (options.esClient.deleteByQuery as unknown as jest.Mock).mockResolvedValueOnce({
      deleted: true,
    });
    await deleteListItem(options);
    const deleteByQuery = {
      index: LIST_ITEM_INDEX,
      query: {
        ids: {
          values: [LIST_ITEM_ID],
        },
      },
      refresh: false,
    };
    expect(options.esClient.deleteByQuery).toBeCalledWith(deleteByQuery);
  });
});
