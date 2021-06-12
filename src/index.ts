import { Logger } from '@aws-sdk/types';
import { LambdaLog } from 'lambda-log';

export class AwsLambdaLogWrapper implements Logger {
    constructor(public log: LambdaLog) { }

    private contentToParams(content: Record<string, unknown>): [string, Record<string, unknown>] {
        const { clientName, commandName, ...meta } = content;
        return [`aws-sdk: ${clientName}.${commandName}`, meta];
    }

    debug(content: Record<string, unknown>): void {
        this.log.debug(...this.contentToParams(content));
    }

    info(content: Record<string, unknown>): void {
        this.log.info(...this.contentToParams(content));
    }
    
    warn(content: Record<string, unknown>): void {
        this.log.warn(...this.contentToParams(content));
    }
    
    error(content: Record<string, unknown>): void {
        this.log.error(...this.contentToParams(content));
    }
}