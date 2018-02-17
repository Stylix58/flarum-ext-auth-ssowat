'use strict';

System.register('tituspijean/flarum-ext-auth-ssowat/main', ['flarum/extend', 'flarum/app', 'flarum/components/HeaderSecondary', 'flarum/components/LogInButtons', 'flarum/components/LogInButton', 'flarum/components/Button', 'flarum/utils/ItemList'], function (_export, _context) {
	"use strict";

	var extend, override, app, HeaderSecondary, LogInButtons, LogInButton, Button, ItemList;
	return {
		setters: [function (_flarumExtend) {
			extend = _flarumExtend.extend;
			override = _flarumExtend.override;
		}, function (_flarumApp) {
			app = _flarumApp.default;
		}, function (_flarumComponentsHeaderSecondary) {
			HeaderSecondary = _flarumComponentsHeaderSecondary.default;
		}, function (_flarumComponentsLogInButtons) {
			LogInButtons = _flarumComponentsLogInButtons.default;
		}, function (_flarumComponentsLogInButton) {
			LogInButton = _flarumComponentsLogInButton.default;
		}, function (_flarumComponentsButton) {
			Button = _flarumComponentsButton.default;
		}, function (_flarumUtilsItemList) {
			ItemList = _flarumUtilsItemList.default;
		}],
		execute: function () {

			app.initializers.add('tituspijean-flarum-ext-auth-ssowat', function () {

				extend(HeaderSecondary.prototype, 'items', function (items) {
					var onlyUseSSOwat = app.forum.attribute('onlyUseSSOwat');

					if (onlyUseSSOwat == true) {
						if (items.has('signUp')) {
							items.remove('signUp');
						}

						if (items.has('logIn')) {
							var width = 600;
							var height = 400;
							var $window = $(window);
							items.replace('logIn', Button.component({
								children: app.translator.trans('flarum-ext-auth-ssowat.forum.log_in'),
								className: 'Button Button--link',
								onclick: function onclick() {
									return window.open(app.forum.attribute('baseUrl') + '/auth/ssowat', 'logInPopup', 'width=' + width + ',' + ('height=' + height + ',') + ('top=' + ($window.height() / 2 - height / 2) + ',') + ('left=' + ($window.width() / 2 - width / 2) + ',') + 'status=no,scrollbars=no,resizable=yes');
								}
							}), 0);
						}
					}
				});

				extend(LogInButtons.prototype, 'items', function (items) {
					items.add('ssowat', m(
						LogInButton,
						{
							className: 'Button LogInButton--ssowat',
							icon: 'address-book',
							path: '/auth/ssowat' },
						app.translator.trans('flarum-ext-auth-ssowat.forum.log_in_with')
					));
				});
			});
		}
	};
});