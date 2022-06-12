export default class SocialMedia {
    socialMedia: { [key: string]: { icon: string, href: string } }

    constructor() {
        this.socialMedia = {
            github: {
                icon: 'fa-brands fa-github',
                href: 'https://github.com/hugoderre'
            },
            website: {
                icon: 'fa-solid fa-globe',
                href: 'https://www.hugoderre.fr'
            },
        }
    }

    getElement() {
        const container = document.createElement( 'div' )
        container.id = 'social-media'
        for ( const key in this.socialMedia ) {
            const link = document.createElement( 'a' )
            link.href = this.socialMedia[ key ].href
            link.target = '_blank'
            link.rel = 'noopener noreferrer'
            const icon = document.createElement( 'i' )
            this.socialMedia[ key ].icon.split( ' ' ).forEach( ( iconClass: string ) => {
                icon.classList.add( iconClass )
            } )
            link.append( icon )
            container.append( link )
        }
        return container
    }
}