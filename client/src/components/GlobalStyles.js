import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    :root {
        --font-heading: 'Permanent Marker', Arial, Helvetica, sans-serif;
        --font-body: 'Kosugi', Arial, Helvetica, sans-serif;
        --padding-page: 24px;
    }

    /* http://meyerweb.com/eric/tools/css/reset/
        v2.0 | 20110126
        License: none (public domain)
    */

        *:focus {
            outline: none;
        }

    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, textarea, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center, button,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        color:#202121;
        font-family: 'Amiri', serif;
        padding: 0;
        border: 0;
        box-sizing: border-box;
        font-size: 100%;
        vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure,
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }


    
    label,
    button {
        font-size: 15px;
        background-color: #fff;
        border: none;
        cursor: pointer;
    }
    p,
    a,
    span,
    li,
    blockquote,
    input {
        color: #000;
        font-size: 15px;
        text-decoration: none;
    }

    input, textarea {
        font-size: 12px;

        &:focus {
            border: 1px solid gray;
        }
    }
`;
