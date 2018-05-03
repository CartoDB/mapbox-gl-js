/**
 * Publish packages to our CDN
 */

// Load secrets file

var fs = require('fs');

var secrets = JSON.parse(fs.readFileSync('secrets.json'));
if (!secrets ||
    !secrets.AWS_USER_S3_KEY ||
    !secrets.AWS_USER_S3_SECRET ||
    !secrets.AWS_S3_BUCKET) {
    throw Error('secrets.json content is not valid');
}

// Load package version

var semver = require('semver');

var version = JSON.parse(fs.readFileSync('package.json')).version;
if (!version || !semver.valid(version)) {
    throw Error('package.json version is not valid');
}

// Publish to CDN

var s3 = require('s3');

var client = s3.createClient({
    s3Options: {
        accessKeyId: secrets.AWS_USER_S3_KEY,
        secretAccessKey: secrets.AWS_USER_S3_SECRET
    }
});

uploadFiles('v' + version);

function uploadFiles(version) {
    console.log('Publish', version);
    var uploader = client.uploadDir({
        localDir: 'dist',
        deleteRemoved: true,
        s3Params: {
            ACL: 'public-read',
            Bucket: secrets.AWS_S3_BUCKET,
            Prefix: 'mapbox-gl/' + version + '/'
        }
    });
    uploader.on('error', function(err) {
        console.error('Error: unable to upload:', err.stack);
    });
    uploader.on('progress', function() {
    });
    uploader.on('end', function() {
        console.log('Done', version);
    });
}
