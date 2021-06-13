import { AwsLambdaLogWrapper } from '.';

const infoMock = jest.fn();

const baseContent = {
    clientName: 'client-name',
    commandName: 'command-name'
};

it('sends simple log message through', () => {
    new AwsLambdaLogWrapper({ info: infoMock }).info(baseContent);
    expect(infoMock).toBeCalledWith('AWS: Call client-name:command-name', { 'aws-sdk': true, ...baseContent });
});
