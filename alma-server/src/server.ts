import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import express from 'express';
import Container from 'typedi';
import { PrismaClient } from '@prisma/client';

import { requestId } from './middlewares/requestId/requestId';
import { IContext } from '../types';
import { schema } from './graphql/schema';

/** Starts the Alma Server */
export const start = async (db: PrismaClient) => {
    const app = express();

    /** Assign unique identifier to each incoming request */
    app.use(requestId);

    const apollo = new ApolloServer({
        schema: await schema,
        csrfPrevention: true,
        cache: 'bounded',
        plugins: [
            ApolloServerPluginLandingPageLocalDefault({ embed: true }),
            {
                requestDidStart: async () => ({
                    willSendResponse: async ({ context }) => {
                        Container.reset(context.requestId);
                    }
                })
            }
        ],
        context: ({ req, res }) => {
            const container = Container.of(req.id);
            const context: IContext = {
                requestId: req.id,
                db,
                container: container
            };
            container.set('context', context);
            return context;
        }
    });

    apollo.applyMiddleware({ app });
};
