<template>
    <div class="sym-layout">
        <Layout>
            <Header class="headerClass"></Header>
            <Layout class="layoutClass">
                <Sider hide-trigger class="sidebarClass">
                    <Steps :current="5" direction="vertical">
                        <Step title="You" content="Information about the first user."></Step>
                        <Step title="Your Company" content="Some details about your organization."></Step>
                        <Step title="Symphony Service" content="How should the service be configured?"></Step>
                        <Step title="Legalese" content="Our terms and conditions."></Step>
                        <Step title="Billing" content="Credit card and billing information."></Step>
                        <Step title="Purchase Summary" content="Subscription summary and confirmation."></Step>
                        <Step title="Finished!" content=""></Step>
                    </Steps>
                </Sider>
                <Content class="contentClass">
                    <Layout class="invisibleLayout">
                        <Row type="flex" justify="center" class="logoRow">
                            <i-col span=2 >
                                <img src="../assets/images/Purchase-Icon.png" height=75/>
                            </i-col>
                        </Row>
                        <Row type="flex" justify="center" class="standardRow">
                            <i-col :xs=24 :sm=18 :md=10 :lg=8>
                                <p class="p2">Review Your Subscription...</p>
                            </i-col>
                        </Row>
                        <Row type="flex" justify="center" class="standardRow">
                            <i-col :xs=24 :sm=20 :md=18 :lg=16>
                                <p  class="p4">
                                    Review the details of your subscription below. If you are satisfied, click "Purchase Now".
                                </p>
                            </i-col>
                        </Row>
                        <Row type="flex" justify="center" class="standardRow">
                            <i-col span=16>
                                <Card>
                                    <p slot="title">Subscription Summary</p>
                                    <p>
                                        <!-- Contact -->
                                        <Row :gutter=16>
                                            <i-col span=6 style="text-align:right;font-weight:bold;">Name:</i-col> <!--border:1px solid green;-->
                                            <i-col span=6 style="text-align:left;">{{user_fullname}}</i-col> <!--border:1px solid orange;-->

                                            <!-- Spacer Element -->
                                            <!--<i-col span=2 style="text-align:center;border: 1px solid purple;">_@_</i-col>-->

                                            <i-col span=4 style="text-align:right;font-weight:bold;">Email Address:</i-col>
                                            <i-col span=8 style="text-align:left;">{{user_email}}</i-col>
                                        </Row>
                                        <!-- Company -->
                                        <Row :gutter=16>
                                            <i-col span=6 style="text-align:right;font-weight:bold;">Company:</i-col>
                                            <i-col span=6 style="text-align:left;">{{user_company}}</i-col>

                                            <i-col span=4 style="text-align:right;font-weight:bold;">Industry:</i-col>
                                            <i-col span=6 style="text-align:left;">{{user_industry}}</i-col>
                                        </Row>
                                        <!-- Service -->
                                        <Row :gutter=16>
                                            <i-col span=6 style="text-align:right;font-weight:bold;">Vanity Name:</i-col>
                                            <i-col span=6 style="text-align:left;">{{serviceSummary.directoryname}}</i-col>                                            

                                            <i-col span=4 style="text-align:right;font-weight:bold;">User Licenses:</i-col>
                                            <i-col span=4 style="text-align:left;">{{serviceSummary.seats}}</i-col>
                                        </Row>
                                        <!-- Billing -->
                                        <Row :gutter=16 style="margin-top:20px;">
                                            <i-col span=6 style="text-align:right;font-weight:bold;">Billing Street:</i-col>
                                            <i-col span=10 style="text-align:left;">{{user_billing_street}}</i-col>
                                        </Row>
                                        <Row :gutter=16>
                                            <i-col span=6 style="text-align:right;font-weight:bold;">City:</i-col>
                                            <i-col span=6 style="text-align:left;">{{user_billing_city}}</i-col>                                            

                                            <i-col span=4 style="text-align:right;font-weight:bold;">State:</i-col>
                                            <i-col span=4 style="text-align:left;">{{user_billing_state}}</i-col>
                                        </Row>
                                        <Row :gutter=16 style="margin-bottom:20px;">
                                            <i-col span=6 style="text-align:right;font-weight:bold;">Postal Code:</i-col>
                                            <i-col span=10 style="text-align:left;">{{user_billing_zip}}</i-col>
                                        </Row>

                                        <Row :gutter=16 style="margin-top: 20px;margin-bottom: 20px;">
                                            <i-col span=6 style="text-align:right;font-weight:bold;">Card:</i-col>
                                            <i-col span=6 style="text-align:left;">****-****-****-{{user_credit_last4}} ({{user_credit_brand}})</i-col>

                                            <i-col span=4 style="text-align:right;font-weight:bold;">Expires:</i-col>
                                            <i-col span=6 style="text-align:left;">{{user_credit_exp_mon}}/{{user_credit_exp_year}}</i-col>
                                        </Row>

                                        <!-- Pricing -->
                                        <Row :gutter=16>
                                            <i-col span=6 style="text-align:right;font-weight:bold;">Setup Fee:</i-col>
                                            <i-col span=4 style="text-align:left;">${{serviceSummary.onetime_fees}}.00</i-col>

                                            
                                            <i-col span=6 style="text-align:right;font-weight:bold">Annual Subscription:</i-col>
                                            <i-col span=6 style="text-align:left;">${{annual_subscription}}.00</i-col>

                                        </Row>
                                        <Row type="flex" justify="start" class="standardRow">
                                            <i-col span=2></i-col>
                                            <i-col span=18>
                                                <p style="font-size:0.8em;">Your subscription will be for <b>12 months</b> from the date of delivery. The setup fee will be charged only once. 
                                                <br/><br/>
                                                Your card will automatically be charged for your subscription yearly on your anniversary date. </p>
                                            </i-col>
                                        </Row>
                                    </p>
                                </Card>
                               
                               
                            </i-col>
                        </Row>
                        <Row type="flex" justify="center" class="standardRow">
                            <i-col :xs=24 :sm=20 :md=18 :lg=16>
                                <Alert show-icon>
                                    Your credit card will <b>not</b> be charged until your instance is complete and you are provided with login credentials.
                                </Alert>
                            </i-col>
                        </Row>
                        <Row type="flex" justify="center" class="alertRow">
                            <i-col :xs=24 :sm=20 :md=18 :lg=16>
                                <Alert show-icon>
                                    Your instance is created at time of purchase. It may take up to <b style="color: Firebrick;">2 hours</b> to receive your login details.
                                </Alert>
                            </i-col>
                        </Row>
                        <Row type="flex" justify="center" class="buttonRow">
                            <i-col :xs=5 :sm=4 :md=3 :lg=2 class-name="backButtonCol">
                                <Button type="primary" size="large" @click="handleGotoBilling">Back</Button>
                            </i-col>
                            <i-col :xs=6 :sm=5 :md=4 :lg=3 class-name="nextButtonCol">
                                <Button type="primary" size="large" @click="handleGotoThankyou">Purchase Now</Button>
                            </i-col>
                        </Row>
                    </Layout>
                </Content>
            </Layout>
            <Footer></Footer>
        </Layout>
    </div>  
</template>
<script>
    import globalState from '../libs/interviewState.js';
    import sfdc_request from '../libs/sfdc.js';

    export default {
        data() {
            return {
                page_title: 'Symphony - Review Your Purchase',
                accordionPanel: ['servicePanel','pricePanel'],
                serviceSummary: {
                    directoryname: '',
                    subdomain: '',
                    seats: 0,
                    region: '',
                    support_tier: '',
                    promocode: '',
                    onetime_fees: 0

                }
            }
        },
        head() {
            return {
                title: this.page_title,
                meta: [
                    { hid: 'description', name: 'description', content: 'Review your purchase details.' }
                ]
                
            }
        },
        mounted: function() {
            if (globalState.service)
            {
                this.serviceSummary.directoryname = globalState.service.directoryname;
                this.serviceSummary.subdomain = globalState.service.subdomain;
                this.serviceSummary.seats = globalState.service.seats;
                this.serviceSummary.support_tier = globalState.service.support_tier;
                this.serviceSummary.promocode = globalState.service.promocode;
            }

            if (globalState.company)
            {
                this.serviceSummary.region = globalState.company.region;
            }

            if (globalState.pricing)
            {
                this.serviceSummary.onetime_fees = globalState.pricing.onetime_fees;
            }
        },
        computed: {
            user_fullname: () => globalState.user.firstname + " " + globalState.user.lastname,
            user_email: () => globalState.user.email,
            user_company: () => globalState.company.name,
            user_industry: () => globalState.company.industry,
            user_billing_street: () => globalState.billing.address1,
            user_billing_state: () => globalState.billing.state,
            user_billing_city: () => globalState.billing.city,
            user_billing_zip: () => globalState.billing.zip,
            user_credit_last4: () => globalState.billing.stripe_token.card.last4,
            user_credit_brand: () => globalState.billing.stripe_token.card.brand,
            user_credit_exp_mon: () => globalState.billing.stripe_token.card.exp_month,
            user_credit_exp_year: () => globalState.billing.stripe_token.card.exp_year,
            annual_subscription: function() {
                return this.serviceSummary.seats * globalState.pricing.pupm * 12;
            },
            service_subscription: function() {

                //The computed properites will execute once as the page is being rigged
                //(but before the 'mounted' directive) and then again after 'mounted'.
                //If an undefined property will throw an exception, we need to test for it.
                if (this.serviceSummary.support_tier != '')
                {
                    var sTier = this.serviceSummary.support_tier.toLowerCase();
                    return globalState.pricing.support_tiers.find(t => t.key === sTier).price;
                }
            },
            total_onetime_fees: function() {
                return this.serviceSummary.onetime_fees;
            },
            total_annual_subscription: function() {
                return this.annual_subscription + this.service_subscription;
            }
        },
        methods: {
            handleGotoThankyou () {

                // 3/22/2018 This is working, I have it commented out for demo purposes
                /*sfdc_request().then(function(response) {
                    console.log('Logging response:');
                    console.log(response);
                }.bind(this)).catch(function (err) {
                    console.log('Logging error:');
                    console.error(err);
                }); */


                //var test = sfdc_request();

                //console.log(test);


                this.$router.push({name: "thankyou"});                
            },
            handleGotoBilling() {
                this.$router.push({name: "billing"})
            }
        }
    }
</script>
<style scoped>


</style>