/**
 * @api
 */
define([
    'Magento_Customer/js/model/customer',
    'Magento_Checkout/js/model/url-builder',
    'mageUtils'
], function (customer, urlBuilder, utils) {
        'use strict';

        return {
            /**
             * @param {Object} quote
             * @return {*}
             */
            getUrlForTotalsEstimationForNewAddress: function (quote) {
                var params = this.getCheckoutMethod() == 'guest' ? //eslint-disable-line eqeqeq
                        {
                            cartId: quote.getQuoteId()
                        } : {},
                    urls = {
                        'guest': '/guest-carts/:cartId/totals-information',
                        'customer': '/carts/mine/totals-information'
                    };

                return this.getUrl(urls, params);
            },

            /**
             * @param {Object} quote
             * @return {*}
             */
            getUrlForEstimationShippingMethodsForNewAddress: function (quote) {
                let params = this.getCheckoutMethod() === 'guest' ? //eslint-disable-line eqeqeq
                        {
                            quoteId: quote.getQuoteId()
                        } : {},
                    urls = {
                        'guest': '/guest-carts/:quoteId/estimate-shipping-methods',
                        'customer': '/carts/mine/estimate-shipping-methods'
                    };

                return this.getUrl(urls, params);
            },

            /**
             * @param {Object} quote
             * @return {*}
             */
            getUrlForEstimationShippingMethodsByAddressId: function (quote) {
                let params = this.getCheckoutMethod() == 'guest' ? //eslint-disable-line eqeqeq
                        {
                            quoteId: quote.getQuoteId()
                        } : {},
                    urls = {
                        'default': '/carts/mine/estimate-shipping-methods-by-address-id'
                    };

                return this.getUrl(urls, params);
            },

            /**
             * @param {number} point
             * @param {String} quoteId
             * @return {*}
             */
            getApplyPointUrl: function (point, quoteId) {
                let params = this.getCheckoutMethod() === 'guest' ? //eslint-disable-line eqeqeq
                        {
                            quoteId: quoteId
                        } : {},
                    urls = {
                        'guest': '/guest-carts/' + quoteId + '/coupons/' + encodeURIComponent(point),
                        'customer': '/carts/mine/loyalty/' + encodeURIComponent(point)
                    };

                return this.getUrl(urls, params);
            },

            /**
             * @param {String} quoteId
             * @return {*}
             */
            getCancelLoyaltyPointUrl: function (quoteId) {
                let params = this.getCheckoutMethod() === 'guest' ? //eslint-disable-line eqeqeq
                        {
                            quoteId: quoteId
                        } : {},
                    urls = {
                        'guest': '/guest-carts/' + quoteId + '/coupons/',
                        'customer': '/carts/mine/loyalty/'
                    };

                return this.getUrl(urls, params);
            },

            /**
             * @param {Object} quote
             * @return {*}
             */
            getUrlForCartTotals: function (quote) {
                let params = this.getCheckoutMethod() == 'guest' ? //eslint-disable-line eqeqeq
                        {
                            quoteId: quote.getQuoteId()
                        } : {},
                    urls = {
                        'guest': '/guest-carts/:quoteId/totals',
                        'customer': '/carts/mine/totals'
                    };

                return this.getUrl(urls, params);
            },

            /**
             * @param {Object} quote
             * @return {*}
             */
            getUrlForSetShippingInformation: function (quote) {
                let params = this.getCheckoutMethod() == 'guest' ? //eslint-disable-line eqeqeq
                        {
                            cartId: quote.getQuoteId()
                        } : {},
                    urls = {
                        'guest': '/guest-carts/:cartId/shipping-information',
                        'customer': '/carts/mine/shipping-information'
                    };

                return this.getUrl(urls, params);
            },

            /**
             * Get url for service.
             *
             * @param {*} urls
             * @param {*} urlParams
             * @return {String|*}
             */
            getUrl: function (urls, urlParams) {
                let url;

                if (utils.isEmpty(urls)) {
                    return 'Provided service call does not exist.';
                }

                if (!utils.isEmpty(urls['default'])) {
                    url = urls['default'];
                } else {
                    url = urls[this.getCheckoutMethod()];
                }

                return urlBuilder.createUrl(url, urlParams);
            },

            /**
             * @return {String}
             */
            getCheckoutMethod: function () {
                return customer.isLoggedIn() ? 'customer' : 'guest';
            }
        };
    }
);
