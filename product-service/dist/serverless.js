import { getProductById, getProductList, createProduct } from './src/functions/index';
const serverlessConfiguration = {
    service: 'product-service',
    frameworkVersion: '2',
    custom: {
        webpack: {
            webpackConfig: './webpack.config.js',
            includeModules: { forceInclude: ['pg'] },
        },
    },
    plugins: ['serverless-webpack'],
    useDotenv: true,
    provider: {
        name: 'aws',
        runtime: 'nodejs14.x',
        stage: "dev",
        region: "eu-west-1",
        httpApi: {
            cors: true
        },
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true,
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
            DB_HOST: process.env.DB_HOST,
            DB_PORT: process.env.DB_PORT,
            DB_NAME: process.env.DB_NAME,
            DB_USER: process.env.DB_USER,
            DB_PASSWORD: process.env.DB_PASSWORD,
        },
        lambdaHashingVersion: '20201221',
    },
    functions: { getProductById, getProductList, createProduct },
};
module.exports = serverlessConfiguration;
