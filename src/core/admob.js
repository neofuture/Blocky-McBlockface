var isAppForeground = true;


let admobid = {};

function initAds() {

    if (/(android)/i.test(navigator.userAgent)) { // for android & amazon-fireos
        admobid = {
            banner: 'ca-app-pub-4514038315329606/7660439072', // or DFP format "/6253334/dfp_example_ad"
            interstitial: 'ca-app-pub-4514038315329606/6100601930'
        };
    } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { // for ios
        admobid = {
            banner: 'ca-app-pub-4514038315329606/7399465060', // or DFP format "/6253334/dfp_example_ad"
            interstitial: 'ca-app-pub-4514038315329606/4431640509'
        };
    } else { // for windows phone
        admobid = {
            banner: 'ca-app-pub-4514038315329606/7399465060', // or DFP format "/6253334/dfp_example_ad"
            interstitial: 'ca-app-pub-4514038315329606/4431640509'
        };
    }

    if (AdMob) AdMob.createBanner({
        adId: admobid.banner,
        position: AdMob.AD_POSITION.BOTTOM_CENTER,
        overlap: true,
        offsetTopBar: false,
        bgColor: 'black'
    });

    registerAdEvents();
}

function onAdLoaded(e) {
    if (isAppForeground) {
    }
}

function onPause() {
    if (isAppForeground) {
        isAppForeground = false;
    }
    AdMob.removeBanner();
}

function showInt() {
    if (game.advertsOn === "YES") {
        if (AdMob) {
            if (/(android)/i.test(navigator.userAgent)) {

            } else {

                AdMob.prepareInterstitial(
                    {
                        adId: admobid.interstitial,
                        autoShow: true,
                        isTesting: false
                    }
                );
            }
        }
        isAppForeground = true;
    }
}

function onResume() {
    if (game.advertsOn === "YES") {
        if (!isAppForeground) {
            if (AdMob) {
                if (/(android)/i.test(navigator.userAgent)) {

                } else {

                    AdMob.prepareInterstitial(
                        {
                            adId: admobid.interstitial,
                            autoShow: true,
                            isTesting: false
                        }
                    );
                }
            }
            isAppForeground = true;
        }

        if (AdMob) AdMob.createBanner({
            adId: admobid.banner,
            position: AdMob.AD_POSITION.BOTTOM_CENTER,
            overlap: true,
            offsetTopBar: false,
            bgColor: 'black',
            isTesting: false
        });
    }
}

function registerAdEvents() {
    document.addEventListener("pause", onPause, false);
    document.addEventListener("resume", onResume, false);
}

function removeAdEvents() {
    document.removeEventListener("pause", onPause);
    document.removeEventListener("resume", onResume);
}