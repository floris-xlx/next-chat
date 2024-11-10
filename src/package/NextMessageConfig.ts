export interface NextMessageConfig {
    characterLimit?: number;
    allowSelectName?: boolean;
    allowSelectMessage?: boolean;
}


export const defaultConfig: NextMessageConfig = {
    characterLimit: 500,
    allowSelectName: false,
    allowSelectMessage: true
};
