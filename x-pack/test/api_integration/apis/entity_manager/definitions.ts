/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import expect from '@kbn/expect';
import {
  entityDefinition as mockDefinition,
  entityDefinitionWithBackfill as mockBackfillDefinition,
} from '@kbn/entityManager-plugin/server/lib/entities/helpers/fixtures';
import { FtrProviderContext } from '../../ftr_provider_context';
import { installDefinition, uninstallDefinition, getInstalledDefinitions } from './helpers/request';

export default function ({ getService }: FtrProviderContext) {
  const supertest = getService('supertest');

  describe('Entity definitions', () => {
    describe('definitions installations', () => {
      it('can install multiple definitions', async () => {
        await installDefinition(supertest, mockDefinition);
        await installDefinition(supertest, mockBackfillDefinition);

        const { definitions } = await getInstalledDefinitions(supertest);
        expect(definitions.length).to.eql(2);
        expect(
          definitions.find(
            (definition) =>
              definition.id === mockDefinition.id &&
              definition.state.installed === true &&
              definition.state.running === true
          )
        );
        expect(
          definitions.find(
            (definition) =>
              definition.id === mockBackfillDefinition.id &&
              definition.state.installed === true &&
              definition.state.running === true
          )
        );

        await uninstallDefinition(supertest, mockDefinition.id);
        await uninstallDefinition(supertest, mockBackfillDefinition.id);
      });

      it('does not start transforms when specified', async () => {
        await installDefinition(supertest, mockDefinition, { installOnly: true });

        const { definitions } = await getInstalledDefinitions(supertest);
        expect(definitions.length).to.eql(1);
        expect(definitions[0].state.installed).to.eql(true);
        expect(definitions[0].state.running).to.eql(false);

        await uninstallDefinition(supertest, mockDefinition.id);
      });
    });
  });
}
