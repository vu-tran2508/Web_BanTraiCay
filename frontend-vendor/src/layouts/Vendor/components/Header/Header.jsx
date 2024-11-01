
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Link } from 'react-router-dom';
// import config from '../../../../config';
import { FaBars } from 'react-icons/fa';
import Logo from '../../../../assets/images/Logo/LOGO2.png';
import MenuLanguage from '../../../../components/Dropdown/MenuLanguage';
import MenuProfile from '../../../../components/Dropdown/MenuProfile';
import './Header.css'


const Header = () => {
  

 

    return (
        <header id='page-topbar'>
            <div className="navbar-header">
                <div className="d-flex">
                    <div className="navbar-brand-box">
                        <a
                            aria-current="page"
                            
                            className="router-link-active router-link-exact-active logo logo-dark"
                        >
                            <span className="logo-sm">
                                <img
                                src={Logo}
                                    alt=""
                                    height={22}
                                />
                            </span>
                            <span className="logo-lg">
                                <img
                                    src={Logo}
                                    alt=""
                                    height={20}
                                />
                            </span>
                        </a>
                        <a
                            aria-current="page"
                            
                            className="router-link-active router-link-exact-active logo logo-light"
                        >
                            <span className="logo-sm">
                                <img
                                    src={Logo}
                                    alt=""
                                    height={22}
                                />
                            </span>
                            <span className="logo-lg">
                                <img
                                    src={Logo}
                                    alt=""
                                    height={20}
                                />
                            </span>
                        </a>
                    </div>
                    <button type="button" className="btn btn-sm px-3 font-size-16 header-item vertical-menu-btn" id="vertical-menu-btn">
                        <FaBars />
                    </button>

                    <form className="app-search d-none d-lg-block">
                        <div className="position-relative">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search..."
                                fdprocessedid="6g7xb"
                            />
                            <span className="uil-search" />
                        </div>
                    </form>
                </div>
                <div className="d-flex">
                    {/* Menu MenuLanguage */}
                    <MenuLanguage />


                    {/* Menu MenuLanguage end */}

                    <div className="btn-group d-none d-lg-inline-block ms-1" right="">
                        <button
                            className="btn btn-md btn-white header-item noti-icon"
                            type="button"
                            id="__BVID__957772___BV_dropdown__"
                            aria-expanded="false"
                            aria-haspopup="menu"
                            fdprocessedid="sso4a"
                        >
                            <i className="uil-apps" />
                        </button>
                        {/**/}
                        <ul
                            className="dropdown-menu show dropdown-menu-lg dropdown-menu-end"
                            aria-labelledby="__BVID__957772___BV_dropdown__"
                            role="menu"
                            style={{
                                top: 70,
                                left: "916.4px",
                                width: "max-content",
                                display: "none"
                            }}
                        >
                            <div className="px-lg-2">
                                <div className="row no-gutters">
                                    <div className="col">
                                        <a className="dropdown-icon-item" href="#">
                                            <img
                                                src=""
                                            />
                                            <span>GitHub</span>
                                        </a>
                                    </div>
                                    <div className="col">
                                        <a className="dropdown-icon-item" href="#">
                                            <img
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAdCAMAAABopjdHAAAAwFBMVEVHcEwAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4MAT4Mri5Y4AAAAP3RSTlMAIwhydxy28hIWIc+je6u9P/b9BUziKJcMxKdZAjyMXjfXu8Hm1eou2t0z+rKRRq+A7my6Qp/M34PrU1YPiL7YsJ9AAAABbUlEQVQYGW3Bh3aiQAAF0EedoSMiYu+isdcka7Lv//9qYTib3eR4LwB9b9yilWBtefeN2NFR6h3WJOfeLIqizn3REiQXgdaEMSdb5uiaWTLXc+mOH5+XOSlGaJDJDN+NSJ7QILn0zcegcJ2SpWUvaZcleFROk44d+jf/MF1sWHlHl895OPI5GyM+10bML97US/iXiazB2jIo8uJtzlqSQptQWZ6hxzoMQaU1gGVTCfUsbPnaR0hllkG2WUkCmCQDmFRuEk2TlcSESdJAQCVoAj0q4YfWXrRduaXyC0BKRQRAARwFK5sxAGdL5X0YW/HniUrkomQNWVt11lQ2swFq4+GK/7RsA7XrzkKWGu3Q/h3Z4c7YQw5yVHpiYTpAX1quJZuATKO1hsqLR+H556smc6mNH0c74dZBxbFZEuv77DLtTARLZx2Vvs+f4j6UIX+yUCte+V03R60/PvA/ouvii7N/m742yESsLrtejsofWqVrkBSdwYAAAAAASUVORK5CYII="
                                                alt="bitbucket"
                                            />
                                            <span>Bitbucket</span>
                                        </a>
                                    </div>
                                    <div className="col">
                                        <a className="dropdown-icon-item" href="#">
                                            <img
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAA0lBMVEVHcEzEI2HDI2HDI2HEI2HDI2HDI2HEI2HDImHDI2HDI2HDImDDI2HEI2HDI2HDI2HDI2HEI2HDI2HDI2HDI2HDI2HDI2HDI2HDI2HDI2HDI2HEJGLDI2HDI2HDI2HqTInxU5C9HFq7GlnyVJHEI2HpS4jwUY/BIV/tTou3FlTCImDzVZK6GVfUNXPfP32+HVziQ4DaOnjrTYrFJWO/Hl3MLGrKKmjAH17uUI3cPXrXN3XSMnC1FFLoSYf1V5T4WpfPLm3mR4TIKGbQMG7wU5DqS4gW3fYwAAAAH3RSTlMAlnPA0mVNzNyLQuQo7zUfxPFVXWx6pPMCRX/1A3yvLDJKvgAAAk1JREFUGBllwIV2GmkUAOAbIUD8bCrp2v1dx10ZBmbf/5WW0DZtTz/44X518fzwef3pwyP87uZKiJhRSlns1iv41f2Vpk73bdumYVUwff0FfvKS07rUNJz4wrlJwpqJj/Dug2D5vNsHrPUS0Sx+rgqxhW/+EKxsuMpEoKWSiCj5rqTiTzh7EqzkSkof0WBPMkRpfORYIW7hzZrmjZKIGd8HrPUSCe8Cmx7pA5zcOpp4iYhSSRfkxvOxtDacUNeXALBmR45n0reUhSaMh7jlxnfsAeDJ0YRjZoxaiG8OsXBDsB95JtWs9S2s4spz1Rg5R+mxcrWu99Gi8ETt6RYu6qrr92WV18wOVuSFyHYZZojIU/YMVzkdBmstK0QVtpgUQTepE0KmhG5go8uwD8M0SkZD/LQrg7zrj8c+TJO0voMNjSa1ELIoY3jT9rlzwWCtHQZbizu4oinHN7LhyYENTNeHtG3bri+F28AFCwmeyKXpmaWHJAxytVsIX3YpfYZVcTAGUfLxYIND1ExzwVqOJ7ynW3hycUJQ8lnbuGu8yZrSlipDbEanvwCsWe8lH7XViTcSkXc2Hw1Kn7LPrwA3ukimLB/c6PGNSmIaEakyV/wDJ9e08v2gR49nBnPbEeP37K9XOLkX9UHTyP+HXy29LdWuY+4Gzl5EHKQTfsfTIDcp01v46vVSFOXsVYZnZK5FVegLeLcStAjnhpNlIZwkoo7dFn7yuNasLrs2itq0dE5sbuBXL2tHGY1jyqjeXP4Nv3m8/LS+u7v+9+MtvPsfo0R0DDqUOxMAAAAASUVORK5CYII="
                                                alt="dribbble"
                                            />
                                            <span>Dribbble</span>
                                        </a>
                                    </div>
                                </div>
                                <div className="row no-gutters">
                                    <div className="col">
                                        <a className="dropdown-icon-item" href="#">
                                            <img
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAhCAMAAABkz+JgAAAAxlBMVEVHcEwAfuYAfuYAfuYAfuYAfecAfuYAfuYAfuYAfuYAfuYAfuYAfuYAfuYAfuYAfuYAfuYAfuYAfuYAfuYAfuYAfuYAfuYAfuYAfuYAfuYAfuUAfuYAfuYAfuYAfuYAfuYAfuYAfuYAfuYAfuYAfuYAfuYAfuYAf+UAfuYAfuYAfuYAfuYAfuYAfuYAfuYAf+YAfuYAfuYAfuYAfuYAfuYAfuYAfuYAfuYAfuYAfuYAfuUAfuYAgOcAfuYAfeYAf+YAfuYAfuZXV9ysAAAAQXRSTlMACxEy+QLr/PX+2xgHGh58vjZgQeTHDu1k6RWMKIbTudej4Jipy0cFcPPvL3MkTBNn0HfFVq5Q6LVrOh8GnFk8kkQ6JVUAAAGsSURBVBgZfcEHgppAAAXQjw4Mgi5iD/Yu9o6uW/Lvf6kgiowmm/cQq3y1G0g0hvMKXuTaksESMdei2LhQaWuTIbOQxZW+9xnyJys8NMqCEVHXAYybPiNyOMNNZW3wYWBjVZeMmVsPocVOMiE3bl4yITdpYFSlShyKXZ8qs4ZcmYrSKIvxd4+KzQXQ+oJ31X4OV5VmlXdyYCM0rklGrLSOG/0tz4jcZnGz7JEMnCwS2sQiWSroiHlDnlY6nngDGjMo3tseXun9dyi8jiyn8MzeyamLh31A0ndSSKQmPZJBLYuI7kheZaouYpcWI7KJK+9T8M7sL3CVq5uMHS5ArkOFudeB4pSK0gWjElXiMOoKqn6tgVReMpEZvuUzTMjWBSGt1mMs8zmrp+uCselcw01uJxkRzqXDanouGJFlGw/jQsCQUThaJIPC0WAoOKeg0k6SRnHpM+I0LMrWAs/m6a/urCl4I7ru6ewV8KxtLO0uE3m7OG3j2dmXFlWdKZt44bYEVZlOEX/RagYTxsTGv1S6Pm/MfAM/+CiWeWUds/jZh1Oi8VvDf+mLbVrHsz8x4n90MIcLhQAAAABJRU5ErkJggg=="
                                                alt="dropbox"
                                            />
                                            <span>Dropbox</span>
                                        </a>
                                    </div>
                                    <div className="col">
                                        <a className="dropdown-icon-item" href="#">
                                            <img
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAjCAMAAADCMPhoAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAJAUExURUdwTGVPRGVPRHVeUGVPRGVPRGRPRWVPRGVPRGVPRGRQRWVPRWVPRGVPRGVPRGRPRWVPRGVPRGVPRGVPRGVPRGBVUmVPRGVPRGtUR2VPRGVPRGVPRGVPRGVPRGVPRGVPRF9LQ3NZSZ6IdmVPRGNVT3poX2VPRGVPRHlhRl9gZIFnR2VPRJBpTP3rzvTSqxIgNEme1yyDwhUiNY5oTGZQRGlSRfzoyf3qzffbuPXixZpzVfTVsGBMQ/PQqXpbSIRiSnFWRvjlyP///39fSW1URrKUeIhkSkM8Pe/Np4tmSyx8tvrgvv37+ZRtT5ZwUuPDn1VHQ595WnNYR5FqTVKCo2NOQ/vlxdrBpCEpN9y7mPXUrj1IWZV7ZzWKxqqTfunIo/PRq7mafsm/ubipoP338LispLyrmKWNeFtlcPzy55yBa/PNo9e2lCcsOO3AkO7Gm1lZXhUpQi6CvsilgzA8TaeCY0SZ05yDbysuOTExOvbYs/HdwaqHaeDBnc62nGJqeOXQtBspPLKch8ytj/327fjz7sO3r35sWb+yqbOObk5jdmNdXzR7sPHJnfDbvUVujVd1inhxcVJgb7+aeerXvDZ5qo2Aeyg0Rh9PdkhphShzq/fixBxFaRk1UZ97XjpznjZCUzQzO15LQydrnq6Vf829sPnn06GGcIRlTy4+UqCeoPLv7s7Hw+Hd2+zp546UnqCjpc62e7uoayhfiqmRSHWAjlBTROa+T9KxTFKFqe/HTp+XXllwgsW4a5e0njlHS3QagBcAAAArdFJOUwChif0QVMAFATnZ3hjoM8j3bbLSKPesC/SV9JpILoBY8Pz9kf3wgnaT/pqvGFBIAAACu0lEQVQ4y3WU5VsiURTGCZFBxcCu7ebOXBiQRgQBRbBwLbCwde3uWN1Ht7u7w+3u/df23mGYhcf1/fp776k5Z3i8CIklObm8rZWbndr9c+2QmCeOF22P34Tj+Ae/KX79/vHlQObeK+dPViRERWBCtOewQqH48/3rx3cvFmkIYX90RPLMbgVWyef3b/0Qc0hLw3hUwjmGN3741A1Z0bFhPBaHV0w8fP5mGdJI2DCV/Y/HMLzx1r1Fum7qvslkKuqH9A4xlz/67ATiI8P+MXraJA9quiiJC7DthFKJyoP+5TqM1XmWQq9dncZxyZBSqWwsgWN0EcJ5hSqA5eSaJGJOIUMJfRVWIOwCQVWV7UxnDaILiI8M05h7ASg1GEqrQFm9r1bGGmSXkeEahCi+HQCDdYbCMg8MxrCGVMRvQFiH8qPsZ3ynB44wluJww21IV6MCAHAYzYMMpuqbk1kD/7ry7oNqxOX5ACxQ6HlfOXovLE/gxjTkRbFdankhAKP4ce8kpXMbizNEoTkUoNpG51AEFSgzI4Oj13jJMa/R7+IHDfssoNJMNaARokDHWyjKWKMlrVqS1DYJgkW4QMBnRgacA1T21ZAh6RrisEFgAXMa3Roy2F2gcl4TwtqZZmEcW0NVYCmAP6HTUBziGl1LoC24MsRu1B9QMX1e1CGm17h1LStd6683pESw0aSMAm8eM8nxmyT56HFra+vLVx6bzXY0NCyxgFkSFSidJa0rT3ra23t6PDbPuj6LuwnWAGpJsulY++qqx7bR0WntEnFLkYYNFgDGSXK2s62jo61zQe+eD9/rRLxNTgD0bBc1bl+zMCXsMiQ4hN0JHCGHtl64P+L2RNihtqju1FoxXuqSC4jI442XYoe6IP/Z06ZJoTwradN5E/xEOafolP/9INIFyYxHKpNs+RMhUnIk4T+Gv3cNvzi99G5fAAAAAElFTkSuQmCC"
                                                alt="mail_chimp"
                                            />
                                            <span>Mail Chimp</span>
                                        </a>
                                    </div>
                                    <div className="col">
                                        <a className="dropdown-icon-item" href="#">
                                            <img
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAACplBMVEVHcEz////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////60uX///////////////////////////////9uytzmmQDpqCA+uZHgFWPkkQAWjnjODgjIAQNVwdYarX3XADfcAEj5/f3cAE7L7PN/1e7ppAuw49I2t42G1bjjFnJkyuXsqyX22qE8uJDyn75zzN70qcViegRUgh/ZAT245ddB2aIzACb34LAFgmbMAgpFsrj//vTS7/QVqnr+/PrppxwwvIzvw2Puu1BKvdT+8PXI7OEOqHaS1+XfA15cw9f96r7E6vFcz/pLdARCvZTw+fbfDV9lhhv/ryHpU4zhGmj2vtH7AlgdtIEYDjGm3+oKlG8bk3zrtwmd2+ggl4FSwpoIimozpJrIkgDe9PrPJQB12v/rtiT8//8rpoR/0N6v4/LtwBxSwtvlO3vI6+pgxqVGu9MLp3NzzLC95++Zkxzwibb/GW0bfWb33qvumwD+c6cUACE3ADAvs4k5UVo3EDnvzCxsxK/kfUb96vnSNgD+rBznnh81r4zUEil7ysTpf4H384miwZjWOxfcag395/cPjW714Hn3ynT6nABVvc9gx+D44rVkx9rbWhfkjxzmS4V3ih1Lj03fFV7TDCJmnV5staHhK2njMHNuxc0nn4Jv0e+wVX9dqo3sFmem6P9Eu9JtAC/IvG1Jfhxym1BsgQqh5/9AEjyoAErufqr01pXrsDYoDjQ4Gj0cy47Alw5wLFTuAVp6z7PYJWp43rueFVRmEkb0ZprVAEUgt4QsiG94nZYsIT9Gx5y9/+uQ18Ci3coAom6/ICZyAAAAKXRSTlMAP9pMoGFRR+eup71y+9DzuF0xoyLgFQKyWWadV4P2w5b+kQivDFtcxZCJTt8AAAKlSURBVBgZdcCDU2QBGADwrxXaai/76oTvvbdmNnezbetqsjHZOtu2bdvGf3K1u9NMN9cPFmPzOOtZsBQ6jiX5IxP+z5bjLxKJnprCP+wtGSwAsMJnpB9J4Vq2I8MeFliiZziuBLDBZJKixrNR5eaGxmBgrupNTx9ANoDj2HhxMXn3YZAsJUNlDno8z/4Ar7g0S1sWL4Z6NfQgtNuXIPpyeKC3zFMuEMR5861Vsbfu590LDbnYQpxIcbMDPXqBl1d+Yl1sZ5As90ZIUVHIhdxuWRUagZ4Test3tB+M9s0irl0pCgnNC+3obEIT0FlHw6Zd9WJxZIM7QRC5Z/PODDVmc5wtQIeNg0G+R8XianEt4SvLatnb6Fd85LA1GJjl9GUR7g311eLIaPeq2LaYbR6Uh1+8EVhZrAIA04yUIMI9OlJcu2ETzksiKYrMNuMickwAaDm3ZbJjxNV2QWIdzosgqdaaQwcCT196gubAxsGODDeVd0V+gDwN522s2b5/X6laqVYMcwCYNOQzzMLlAkGcN87ZsnmrRCoN8xGWhpWYwhwrG3AqCJgWJGowNbjERyGNkkh2+hQqFYE0MOC/f6kJGL0+olRmnpNIJNIodWZPMNJBh+7KDx+deTF5p1woFPqcl0qjmnevQBc66Lhi2ad3Wu3U80fCm4XqTEXzyVMee0wtQI8VXxKmLP9YOTtb+bhcfXm4rLWry8Mvxgj0lgUrCoUjHyqntJOvJ8qQtjyJpCgywhj0eIEKofDNZ+33ma8/2rhGsPq4KCFBFMEFPYfUnjBl6cS3Co3mS5ozAAuTRaLkeBYY2GFgcCr+rBAI5G/5awCM0d8fGbCAacxgmxR4TefLe9EGAJhcLhMWs8Vff9L7Pa1hCSb4eyAc2bAUBzOOCx0W+QuvxroExNCXxAAAAABJRU5ErkJggg=="
                                                alt="slack"
                                            />
                                            <span>Slack</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </ul>
                    </div>
                    <div className="btn-group dropdown d-inline-block" right="">
                        <button
                            className="btn btn-md btn-white header-item noti-icon"
                            type="button"
                        >
                            <i className="uil-bell" />
                            <span className="badge bg-danger rounded-pill">3</span>
                        </button>
                        {/**/}
                        <ul
                            className="dropdown-menu show dropdown-menu-lg dropdown-menu-end p-0"
                            role="menu"
                            style={{
                                top: 70,
                                left: "1012.4px",
                                width: "max-content",
                                display: "none"
                            }}
                        >
                            <div className="p-3">
                                <div className="row align-items-center">
                                    <div className="col">
                                        <h5 className="m-0 font-size-16">Notifications</h5>
                                    </div>
                                    <div className="col col-auto">
                                        <a href="#" className="small">
                                            Mark all as unread
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div data-simplebar="init" style={{ maxHeight: 230 }}>
                                <div className="simplebar-wrapper" style={{ margin: 0 }}>
                                    <div className="simplebar-height-auto-observer-wrapper">
                                        <div className="simplebar-height-auto-observer" />
                                    </div>
                                    <div className="simplebar-mask">
                                        <div className="simplebar-offset" style={{ right: 0, bottom: 0 }}>
                                            <div
                                                className="simplebar-content-wrapper"
                                                tabIndex={0}
                                                role="region"
                                                aria-label="scrollable content"
                                                style={{ height: "auto", overflow: "hidden" }}
                                            >
                                                <div className="simplebar-content" style={{ padding: 0 }}>
                                                    <a href="#" className="text-reset notification-item">
                                                        <div className="media d-flex">
                                                            <div className="avatar-xs me-3">
                                                                <span className="avatar-title bg-primary rounded-circle font-size-16">
                                                                    <i className="uil-shopping-basket" />
                                                                </span>
                                                            </div>
                                                            <div className="media-body">
                                                                <h6 className="mt-0 mb-1">Your order is placed</h6>
                                                                <div className="font-size-12 text-muted">
                                                                    <p className="mb-1">
                                                                        If several languages coalesce the grammar
                                                                    </p>
                                                                    <p className="mb-0">
                                                                        <i className="mdi mdi-clock-outline" /> 3 min ago
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                    <a href="#" className="text-reset notification-item">
                                                        <div className="media d-flex">
                                                            <img
                                                                src="/minible/vue/v-light/img/avatar-3.78c31fc9.jpg"
                                                                className="me-3 rounded-circle avatar-xs"
                                                                alt="user-pic"
                                                            />
                                                            <div className="media-body">
                                                                <h6 className="mt-0 mb-1">James Lemire</h6>
                                                                <div className="font-size-12 text-muted">
                                                                    <p className="mb-1">
                                                                        It will seem like simplified English.
                                                                    </p>
                                                                    <p className="mb-0">
                                                                        <i className="mdi mdi-clock-outline" /> 1 hours
                                                                        ago
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                    <a href="#" className="text-reset notification-item">
                                                        <div className="media d-flex">
                                                            <div className="avatar-xs me-3">
                                                                <span className="avatar-title bg-success rounded-circle font-size-16">
                                                                    <i className="uil-truck" />
                                                                </span>
                                                            </div>
                                                            <div className="media-body">
                                                                <h6 className="mt-0 mb-1">Your item is shipped</h6>
                                                                <div className="font-size-12 text-muted">
                                                                    <p className="mb-1">
                                                                        If several languages coalesce the grammar
                                                                    </p>
                                                                    <p className="mb-0">
                                                                        <i className="mdi mdi-clock-outline" /> 3 min ago
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                    <a href="#" className="text-reset notification-item">
                                                        <div className="media d-flex">
                                                            <img
                                                                src="/minible/vue/v-light/img/avatar-4.e29aa43c.jpg"
                                                                className="me-3 rounded-circle avatar-xs"
                                                                alt="user-pic"
                                                            />
                                                            <div className="media-body">
                                                                <h6 className="mt-0 mb-1">Salena Layfield</h6>
                                                                <div className="font-size-12 text-muted">
                                                                    <p className="mb-1">
                                                                        As a skeptical Cambridge friend of mine
                                                                        occidental.
                                                                    </p>
                                                                    <p className="mb-0">
                                                                        <i className="mdi mdi-clock-outline" /> 1 hours
                                                                        ago
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="simplebar-placeholder"
                                        style={{ width: 0, height: 0 }}
                                    />
                                </div>
                                <div
                                    className="simplebar-track simplebar-horizontal"
                                    style={{ visibility: "hidden" }}
                                >
                                    <div
                                        className="simplebar-scrollbar"
                                        style={{ width: 0, display: "none" }}
                                    />
                                </div>
                                <div
                                    className="simplebar-track simplebar-vertical"
                                    style={{ visibility: "hidden" }}
                                >
                                    <div
                                        className="simplebar-scrollbar"
                                        style={{ height: 0, display: "none" }}
                                    />
                                </div>
                            </div>
                            <div className="p-2 border-top">
                                <div className="d-grid">
                                    <a
                                        className="btn btn-sm btn-link font-size-14 text-center"
                                        href="#"
                                    >
                                        <i className="uil-arrow-circle-right me-1" /> Load More..
                                    </a>
                                </div>
                            </div>
                        </ul>
                    </div>
                    {/* menu Profile */}
                    <MenuProfile/>


                     {/* menu Profile_end*/}
                  
                    <div className="dropdown d-inline-block">
                        <button
                            className="btn btn-md btn-button btn header-item noti-icon right-bar-toggle toggle-right"
                            type="button"
                        >
                            <i className="uil-cog toggle-right" />
                        </button>
                    </div>
                </div>
            </div>

        </header>



    );
};

export default Header;
