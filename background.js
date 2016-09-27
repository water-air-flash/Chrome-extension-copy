chrome.webRequest.onBeforeRequest.addListener(
    function() { return {cancel: true}; }, {
      urls: [
        'https://www.google-analytics.com/analytics.js',
        'https://www.linkedin.com/lynda/*',
        'https://apis.google.com/js/client.js',
        // "https://cdn.lynda.com/static/course/js/*.js",
        'https://tags.tiqcdn.com/utag/lynda/main/prod/*',
        'http://115.239.253.56/v.cctv.com/flash/vd/*',
        'https://ssl.gstatic.com/accounts/o/*'
      ],  // Change this to a more specific pattern
      types: ['script']
    },
    ['blocking']);


