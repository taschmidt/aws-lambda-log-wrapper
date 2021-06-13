import { Logger } from '@aws-sdk/types';
import { LambdaLog } from 'lambda-log';
import truncate from 'json-truncate';

type LogContent = Record<string, unknown>;

export class AwsLambdaLogWrapper implements Logger {
    constructor(public log: LambdaLog) { }

    private contentToParams(content: LogContent): [string, LogContent] {
        const { clientName, commandName } = content;
        content['aws-sdk'] = true;
        return [`AWS: Call ${clientName}:${commandName}`, truncate(content, { maxDepth: 3, replace: '[Truncated]' })];
    }

    debug(content: LogContent): void {
        this.log.debug(...this.contentToParams(content));
    }

    info(content: LogContent): void {
        this.log.info(...this.contentToParams(content));
    }
    
    warn(content: LogContent): void {
        this.log.warn(...this.contentToParams(content));
    }
    
    error(content: LogContent): void {
        this.log.error(...this.contentToParams(content));
    }
}
