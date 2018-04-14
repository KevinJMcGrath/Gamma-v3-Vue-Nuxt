<template>
    <div class="sym-layout">
        <Layout>
            <Header class="headerClass"></Header>
            <Layout class="layoutClass">
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
                                            <i-col span=6 style="text-align:left;">{{importDetails.firstname}} {{importDetails.lastname}}</i-col> <!--border:1px solid orange;-->

                                            <!-- Spacer Element -->
                                            <!--<i-col span=2 style="text-align:center;border: 1px solid purple;">_@_</i-col>-->

                                            <i-col span=4 style="text-align:right;font-weight:bold;">Email Address:</i-col>
                                            <i-col span=8 style="text-align:left;">{{importDetails.email}}</i-col>
                                        </Row>
                                        <!-- Company -->
                                        <Row :gutter=16>
                                            <i-col span=6 style="text-align:right;font-weight:bold;">Company:</i-col>
                                            <i-col span=6 style="text-align:left;">{{importDetails.company}}</i-col>

                                            <i-col span=4 style="text-align:right;font-weight:bold;">Industry:</i-col>
                                            <i-col span=6 style="text-align:left;">{{importDetails.industry}}</i-col>
                                        </Row>
                                        <!-- Service -->
                                        <Row :gutter=16>
                                            <i-col span=6 style="text-align:right;font-weight:bold;">Vanity Name:</i-col>
                                            <i-col span=6 style="text-align:left;">{{importDetails.directoryname}}</i-col>                                            

                                            <i-col span=4 style="text-align:right;font-weight:bold;">User Licenses:</i-col>
                                            <i-col span=4 style="text-align:left;">{{importDetails.seats}}</i-col>
                                        </Row>

                                        <!-- Pricing -->
                                        <Row :gutter=16>
                                            <i-col span=6 style="text-align:right;font-weight:bold;">Setup Fee:</i-col>
                                            <i-col span=4 style="text-align:left;">${{importDetails.onetime_fees}}.00</i-col>

                                            
                                            <i-col span=6 style="text-align:right;font-weight:bold">Annual Subscription:</i-col>
                                            <i-col span=6 style="text-align:left;">${{annual_subscription}}.00</i-col>

                                        </Row>
                                    </p>
                                </Card>
                            </i-col>
                        </Row>
                        
                        <Form ref="billingForm" :model="billingForm" :label-width="150" :rules="validation_rules">
                        <Row type="flex" justify="center" class="standardRow">
                            <i-col span=16>
                                <Card>
                                    <p slot="title">Billing Details</p>
                                    <p>
                                        <Row type="flex" justify="center">
                                            <i-col span=18>
                                                <div class="stripeBox">
                                                    <div id="card-element"></div>
                                                </div>
                                                <p style="color: #ED3F14; font-size: 0.9em;">{{billingForm.stripe_error}}</p>
                                            </i-col>
                                        </Row>
                                        <Row>
                                            <i-col span=20>
                                                <FormItem label="Address" prop="address1">
                                                    <i-input v-model="billingForm.address1" @on-change="fieldChange('address1')"></i-input>
                                                </FormItem>
                                            </i-col>
                                        </Row>
                                        <Row>
                                            <i-col span=8>
                                                <FormItem label="City" prop="city">
                                                    <i-input v-model="billingForm.city" @on-change="fieldChange('city')"></i-input>
                                                </FormItem>
                                            </i-col>
                                            <i-col span=6 >
                                                <FormItem label="State/Province" prop="state">
                                                    <i-input v-model="billingForm.state" @on-change="fieldChange('state')"></i-input>
                                                </FormItem>
                                            </i-col>
                                            <i-col span=6>
                                                <FormItem label="Postal Code" prop="zip">
                                                    <i-input v-model="billingForm.zip" @on-change="fieldChange('zip')"></i-input>
                                                </FormItem>
                                            </i-col>
                                        </Row>
                                        
                                        <Row type="flex" justify="center" class="standardRow">
                                            <i-col span=16>
                                                <p style="font-size:0.8em;">Your subscription will be for <b>12 months</b> from the date of delivery. The setup fee will be charged only once. 
                                                <br/><br/>
                                                Your card will automatically be charged for your subscription yearly on your anniversary date. </p>
                                            </i-col>
                                        </Row>
                                    </p>
                                </Card>                               
                            </i-col>
                        </Row>
                        </Form>

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

    

    export default {
        data() {
            return {
                stripeElement: null,
                page_title: 'Symphony - Review Your Purchase',
                importDetails: {
                    firstname: '',
                    lastname: '',
                    email: '',
                    phone: '',
                    company: '',
                    industry: '',
                    directoryname: '',
                    seats: 0,
                    promocode: '',
                    onetime_fees: 0
                },
                billingForm: {
                    address1: '',
                    city: '',
                    state: '',
                    zip: '',
                    stripe_error: ''
                },
                validation_rules: {
                    address1: [
                        { required: true, message: 'Please provide your street address.', trigger: 'blur' }
                    ],
                    city: [
                        { required: true, message: 'Please provide your city or town.', trigger: 'blur' }
                    ],
                    state: [
                        { required: true, message: 'Please provide your state or province.', trigger: 'blur' }
                    ],
                    zip: [
                        { required: true, message: 'Please provide your zip or postal code.', trigger: 'blur' }
                    ]
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

            if (this.$route.query && this.$route.query.def)
            {
                console.log('query string: ')
                console.log(this.$route.query.def)

                const importObj = JSON.parse(atob(this.$route.query.def))

                this.importDetails.firstname = importObj.firstname
                this.importDetails.lastname = importObj.lastname
                this.importDetails.email = importObj.email
                this.importDetails.phone = importObj.phone
                this.importDetails.company = importObj.company
                this.importDetails.industry = importObj.industry
                this.importDetails.directoryname = importObj.xpod_name

            }
            else
            {
                if (globalState.user)
                {
                    this.importDetails.firstname = globalState.user.firstname
                    this.importDetails.lastname = globalState.user.lastname
                    this.importDetails.email = globalState.user.email
                    this.importDetails.phone = globalState.user.mobilephone
                }

                if (globalState.company)
                {
                    this.importDetails.company = globalState.company.name
                    this.importDetails.industry = globalState.company.industry

                }

                if (globalState.service)
                {
                    this.importDetails.directoryname = globalState.service.directoryname;
                    this.importDetails.seats = globalState.service.seats;
                    this.importDetails.promocode = globalState.service.promocode;

                    this.billingForm.address1 = globalState.billing.address1;
                    this.billingForm.address2 = globalState.billing.address2;
                    this.billingForm.city = globalState.billing.city;
                    this.billingForm.state = globalState.billing.state;
                    this.billingForm.zip = globalState.billing.zip;
                    this.billingForm.country = globalState.billing.country;
                }
            }            

            if (globalState.pricing)
            {
                this.importDetails.onetime_fees = globalState.pricing.onetime_fees;
            }

            this.stripeElement = this.MountStripeElements();
        },
        computed: {
            annual_subscription: function() {
                return this.importDetails.seats * globalState.pricing.pupm * 12;
            },
            service_subscription: function() {

                //The computed properites will execute once as the page is being rigged
                //(but before the 'mounted' directive) and then again after 'mounted'.
                //If an undefined property will throw an exception, we need to test for it.
                if (this.importDetails.support_tier != '')
                {
                    var sTier = this.importDetails.support_tier.toLowerCase();
                    return globalState.pricing.support_tiers.find(t => t.key === sTier).price;
                }
            },
            total_onetime_fees: function() {
                return this.importDetails.onetime_fees;
            },
            total_annual_subscription: function() {
                return this.annual_subscription + this.service_subscription;
            }
        },
        methods: {
            handleGotoThankyou () {

                this.$router.push({name: "thankyou"});                
            },
            MountStripeElements()
            {
                const stripe = Stripe('pk_test_gUJYd9BdGY6XdYL9RltHkmRe');                

                const elements = stripe.elements();
                
                const card = elements.create('card', {
                  hidePostalCode: true,
                  style: {
                    base: {
                      iconColor: '#F99A52',
                      color: '#32315E',
                      fontWeight: 400,
                      fontFamily: '"Helvetica Neue", "Helvetica", sans-serif',
                      fontSize: '15px',

                      '::placeholder': {
                        color: 'steelblue',
                      }
                    },
                  }
                });
                card.mount('#card-element');

                return card;
            }
        }
    }
</script>
<style scoped>

    .stripeBox {
        border: 1px solid lightgray;
        padding: 10px;
        margin-bottom: 10px;
        border-radius: 20px;
    }

</style>