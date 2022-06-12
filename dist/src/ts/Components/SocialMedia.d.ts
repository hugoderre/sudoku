export default class SocialMedia {
    socialMedia: {
        [key: string]: {
            icon: string;
            href: string;
        };
    };
    constructor();
    getElement(): HTMLDivElement;
}
