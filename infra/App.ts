#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { WebsiteStack } from './lib/WebsiteStack';

const app = new cdk.App();

new WebsiteStack(app, 'BooksWebsiteStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});