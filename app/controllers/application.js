import Controller from '@ember/controller';

export default Controller.extend({
	ajax: Ember.inject.service(),

	init() {
		this._super();
		var token = 'interview-api:interviewapipassword';
        var hash = btoa(token)
        var auth = "Basic " + hash;
        var mobileIds = ['android23', 'android4', 'androidgmailapp', 'blackberryhtml', 'iphone4',
        'iphone5', 'iphone5s', 'iphone6', 'iphone6plus', 'ipad', 'ipadmini', 'symbians60', 'windowsphone8'];
        var devices = [];

        this.get('ajax').request('https://previews-api.litmus.com/api/v1/EmailTests/' + '48751347', {
            method: 'GET',
            headers:{
                'Authorization': auth,
                'Content-Type': 'application/json'

            }
        })
        .then(response => {
            for(var i = 0; i < response['TestingApplications'].length; i++) {
                if(mobileIds.indexOf(response['TestingApplications'][i]['ApplicationName'].toLowerCase()) != -1) {
                    devices.push(response['TestingApplications'][i]);
                }
            }

            this.set('model.devices', devices)
            console.log(devices);
        })
        .catch(err => {
            console.log('Error: ', err);
        });
	}
});
