import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="site-footer">
            <div className="footer-top">
                <div><p className="eyebrow">Thanks for stopping by</p><h2>Keep building<br /><em>good things.</em></h2></div>
            </div>
            <div className="footer-bottom">
                <p>ABDUL<span>HADI</span> / 2026</p>
                <p>Student exploring computer science &amp; technology.</p>
                <a href="mailto:abdulhaditahir405@gmail.com">Say hello ↗</a>
            </div>
        </footer>
    );
};

export default Footer;