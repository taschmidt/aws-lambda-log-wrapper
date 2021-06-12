import { Logger } from '@aws-sdk/types';
import { LambdaLog } from 'lambda-log';

export class AwsLambdaLogWrapper implements Logger {
    constructor(public log: LambdaLog) { }

    private contentToParams(content: any): [string, object] {
        const { clientName, commandName, ...meta } = content;
        return [`aws-sdk: ${clientName}.${commandName}`, meta];
    }

    debug(content: object): void {
        this.log.debug(...this.contentToParams(content));
    }

    info(content: object): void {
        this.log.info(...this.contentToParams(content));
    }
    
    warn(content: object): void {
        this.log.warn(...this.contentToParams(content));
    }
    
    error(content: object): void {
        this.log.error(...this.contentToParams(content));
    }
}
