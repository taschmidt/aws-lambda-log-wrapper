# aws-lambda-log-wrapper

[![npm version](https://badge.fury.io/js/aws-lambda-log-wrapper.svg)](https://badge.fury.io/js/aws-lambda-log-wrapper)

A tiny little wrapper around the amazing [Lambda Log](https://lambdalog.js.org/) library for use as logging middleware in [AWS SDK for JavaScript v3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/).

## Installation

`yarn add aws-lambda-log-wrapper`

OR

`npm i aws-lambda-log-wrapper`

## Usage

```typescript
import { AwsLambdaLogWrapper } from 'aws-lambda-log-wrapper';
import { STSClient, GetCallerIdentityCommand } from '@aws-sdk/client-sts';
import { LambdaLog } from 'lambda-log';

const log = new LambdaLog();

new STSClient({ logger: new AwsLambdaLogWrapper(log) }).send(new GetCallerIdentityCommand({}))
```

Writes the following to the console:
```json
{"_logLevel":"info","msg":"aws-sdk: STSClient.GetCallerIdentityCommand","input":{},"output":{"UserId":"...","Account":"...","Arn":"arn:aws:sts::...:assumed-role/..."},"metadata":{"httpStatusCode":200,"requestId":"25fe0f95-7975-443f-bcd9-65321461aa43","attempts":1,"totalRetryDelay":0},"aws-sdk":true,"_tags":[]}
```
