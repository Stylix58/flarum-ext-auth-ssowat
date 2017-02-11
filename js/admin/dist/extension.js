"use strict";

System.register("tituspijean/flarum-ext-auth-ssowat/addSSOwatPage", ["flarum/extend", "flarum/components/AdminNav", "flarum/components/AdminLinkButton", "tituspijean/flarum-ext-auth-ssowat/components/SSOwatPage"], function (_export, _context) {
    "use strict";

    var extend, AdminNav, AdminLinkButton, SSOwatPage;

    _export("default", function () {
        app.routes['tituspijean-flarum-ext-auth-ssowat'] = { path: '/ssowat', component: SSOwatPage.component() };
        app.extensionSettings['tituspijean-flarum-ext-auth-ssowat'] = function () {
            return m.route(app.route('tituspijean-flarum-ext-auth-ssowat'));
        };
        extend(AdminNav.prototype, 'items', function (items) {
            items.add('tituspijean-flarum-ext-auth-ssowat', AdminLinkButton.component({
                href: app.route('tituspijean-flarum-ext-auth-ssowat'),
                icon: 'address-book',
                children: 'SSOwat authentication',
                description: app.translator.trans('flarum-ext-auth-ssowat.admin.description')
            }));
        });
    });

    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumComponentsAdminNav) {
            AdminNav = _flarumComponentsAdminNav.default;
        }, function (_flarumComponentsAdminLinkButton) {
            AdminLinkButton = _flarumComponentsAdminLinkButton.default;
        }, function (_tituspijeanFlarumExtAuthSsowatComponentsSSOwatPage) {
            SSOwatPage = _tituspijeanFlarumExtAuthSsowatComponentsSSOwatPage.default;
        }],
        execute: function () {}
    };
});;
"use strict";

System.register("tituspijean/flarum-ext-auth-ssowat/components/SSOwatPage", ["flarum/Component", "flarum/components/Button", "flarum/utils/saveSettings", "flarum/components/Alert", "flarum/components/Select", "flarum/components/Switch"], function (_export, _context) {
    "use strict";

    var Component, Button, saveSettings, Alert, Select, Switch, SSOwatPage;
    return {
        setters: [function (_flarumComponent) {
            Component = _flarumComponent.default;
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }, function (_flarumUtilsSaveSettings) {
            saveSettings = _flarumUtilsSaveSettings.default;
        }, function (_flarumComponentsAlert) {
            Alert = _flarumComponentsAlert.default;
        }, function (_flarumComponentsSelect) {
            Select = _flarumComponentsSelect.default;
        }, function (_flarumComponentsSwitch) {
            Switch = _flarumComponentsSwitch.default;
        }],
        execute: function () {
            SSOwatPage = function (_Component) {
                babelHelpers.inherits(SSOwatPage, _Component);

                function SSOwatPage() {
                    babelHelpers.classCallCheck(this, SSOwatPage);
                    return babelHelpers.possibleConstructorReturn(this, (SSOwatPage.__proto__ || Object.getPrototypeOf(SSOwatPage)).apply(this, arguments));
                }

                babelHelpers.createClass(SSOwatPage, [{
                    key: "init",
                    value: function init() {
                        var _this2 = this;

                        this.loading = false;

                        this.fields = ['address'];

                        this.checkboxes = [''];

                        this.values = {};

                        this.settingsPrefix = 'flarum-ext-auth-ssowat';

                        var settings = app.data.settings;

                        this.fields.forEach(function (key) {
                            return _this2.values[key] = m.prop(settings[_this2.addPrefix(key)]);
                        });
                        this.checkboxes.forEach(function (key) {
                            return _this2.values[key] = m.prop(settings[_this2.addPrefix(key)] === '1');
                        });
                    }
                }, {
                    key: "view",
                    value: function view() {
                        return [m('div', { className: 'SSOwatPage' }, [m('div', { className: 'container' }, [m('form', { onsubmit: this.onsubmit.bind(this) }, [m('fieldset', { className: 'SSOwatPage-preferences' }, [m('legend', {}, app.translator.trans('flarum-ext-auth-ssowat.admin.settings.title')), m('label', {}, app.translator.trans('flarum-ext-auth-ssowat.admin.settings.address')), m('input', {
                            className: 'FormControl',
                            value: this.values.address() || '',
                            oninput: m.withAttr('value', this.values.address)
                        }), Button.component({
                            type: 'submit',
                            className: 'Button Button--primary',
                            children: app.translator.trans('flarum-ext-auth-ssowat.admin.buttons.save'),
                            loading: this.loading,
                            disabled: !this.changed()
                        })])])])])];
                    }
                }, {
                    key: "changed",
                    value: function changed() {
                        var _this3 = this;

                        var fieldsCheck = this.fields.some(function (key) {
                            return _this3.values[key]() !== app.data.settings[_this3.addPrefix(key)];
                        });
                        var checkboxesCheck = this.checkboxes.some(function (key) {
                            return _this3.values[key]() !== (app.data.settings[_this3.addPrefix(key)] == '1');
                        });
                        return fieldsCheck || checkboxesCheck;
                    }
                }, {
                    key: "onsubmit",
                    value: function onsubmit(e) {
                        var _this4 = this;

                        e.preventDefault();

                        if (this.loading) return;

                        this.loading = true;

                        app.alerts.dismiss(this.successAlert);

                        var settings = {};

                        this.fields.forEach(function (key) {
                            return settings[_this4.addPrefix(key)] = _this4.values[key]();
                        });
                        this.checkboxes.forEach(function (key) {
                            return settings[_this4.addPrefix(key)] = _this4.values[key]();
                        });

                        saveSettings(settings).then(function () {
                            app.alerts.show(_this4.successAlert = new Alert({
                                type: 'success',
                                children: app.translator.trans('core.admin.basics.saved_message')
                            }));
                        }).catch(function () {}).then(function () {
                            _this4.loading = false;
                            m.redraw();
                        });
                    }
                }, {
                    key: "addPrefix",
                    value: function addPrefix(key) {
                        return this.settingsPrefix + '.' + key;
                    }
                }]);
                return SSOwatPage;
            }(Component);

            _export("default", SSOwatPage);
        }
    };
});;
'use strict';

System.register('tituspijean/flarum-ext-auth-ssowat/main', ['flarum/app', 'tituspijean/flarum-ext-auth-ssowat/addSSOwatPage'], function (_export, _context) {
  "use strict";

  var app, addSSOwatPage;
  return {
    setters: [function (_flarumApp) {
      app = _flarumApp.default;
    }, function (_tituspijeanFlarumExtAuthSsowatAddSSOwatPage) {
      addSSOwatPage = _tituspijeanFlarumExtAuthSsowatAddSSOwatPage.default;
    }],
    execute: function () {

      app.initializers.add('tituspijean-flarum-ext-auth-ssowat', function (app) {
        addSSOwatPage();
      });
    }
  };
});