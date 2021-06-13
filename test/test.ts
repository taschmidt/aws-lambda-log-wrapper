import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { GetCallerIdentityCommand, STSClient } from '@aws-sdk/client-sts';
import { LambdaLog } from 'lambda-log';
import { AwsLambdaLogWrapper } from '../src';

const log = new LambdaLog();

(async () => {
    await new STSClient({ logger: new AwsLambdaLogWrapper(log) }).send(new GetCallerIdentityCommand({}));
})();
