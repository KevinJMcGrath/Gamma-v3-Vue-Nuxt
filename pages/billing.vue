<template>
    <div class="sym-layout">
        <Layout>
            <Header class="headerClass"></Header>
            <Layout>
                <Sider hide-trigger class="sidebarClass">
                    <Steps :current="4" direction="vertical">
                        <Step title="You" content="Information about the first user."></Step>
                        <Step title="Your Company" content="Some details about your organization."></Step>
                        <Step title="Symphony Service" content="How should the service be configured?"></Step>
                        <Step title="Legalese" content="Our terms and conditions."></Step>
                        <Step title="Billing" content="Credit card and billing information"></Step>
                        <Step title="Purchase Summary" content="Subscription summary and confirmation."></Step>
                        <Step title="Finished!" content=""></Step>
                    </Steps>
                </Sider>
                <Content class="contentClass">
                    <Layout class="invisibleLayout">
                        <Row type="flex" justify="center" class="logoRow">
                            <i-col span=2 >
                                <img src="../assets/images/Billing-Icon.png" height=75/>
                            </i-col>
                        </Row>
                        <Row type="flex" justify="center" class="standardRow">
                            <i-col :xs=24 :sm=18 :md=10 :lg=8>
                                <p class="p2">Your Billing Info...</p>
                            </i-col>
                        </Row>
                        <Row type="flex" justify="center" class="standardRow">
                            <i-col :xs=24 :sm=20 :md=18 :lg=16>
                                <p class="p4">
                                    It's time for the hard part. We're going to ask you some questions about the payment method you want to use to subscribe to the Symphony service. Symphony uses <a href="#">Stripe</a> as our payment processor in order to provide an easy, secure experience. 
                                </p>
                            </i-col>
                        </Row>

                        <Form ref="billingForm" :model="billingForm" :label-width="150" :rules="validation_rules">
                        <!--<Row type="flex" justify="center" class="standardRow">
                            <i-col :xs=20 :sm=20 :md=12 :lg=10>                                
                                <FormItem label="Payment Type" >
                                    <Select v-model="billingForm.type" placeholder="Select" @on-change="fieldChange('type')">
                                        <Option value="card">Credit Card</Option>
                                        <Option value="ach">Company ACH Transfer</Option>
                                    </Select>
                                </FormItem>
                            </i-col>
                        </Row>-->
                        <Row type="flex" justify="center"  class="standardRow">
                            <i-col :xs=20 :sm=20 :md=18 :lg=14>
                                <Card>
                                    <p slot="title">Payment Details</p>
                                    <p>
                                        <Row type="flex" justify="center">
                                            <i-col span=18>
                                                <div class="stripeBox">
                                                    <div id="card-element"></div>
                                                </div>
                                                <p style="color: #ED3F14; font-size: 0.9em;">{{billingForm.stripeError.message}}</p>
                                            </i-col>
                                        </Row>
                                        <Row>
                                            <i-col span=24>
                                                <FormItem :label-width=10 prop="address1">
                                                    <i-input v-model="billingForm.address1" @on-change="fieldChange('address1')" placeholder="Street Address"></i-input>
                                                </FormItem>
                                            </i-col>
                                        </Row>
                                        <Row>
                                            <i-col span=10>
                                                <FormItem :label-width=10 prop="city">
                                                    <i-input v-model="billingForm.city" @on-change="fieldChange('city')" placeholder="City"></i-input>
                                                </FormItem>
                                            </i-col>
                                            <i-col span=6 >
                                                <FormItem :label-width=10 prop="state">
                                                    <i-input v-model="billingForm.state" @on-change="fieldChange('state')" placeholder="State"></i-input>
                                                </FormItem>
                                            </i-col>
                                            <i-col span=8>
                                                <FormItem :label-width=10 prop="zip">
                                                    <i-input v-model="billingForm.zip" @on-change="fieldChange('zip')" placeholder="ZIP"></i-input>
                                                </FormItem>
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

                        <Row type="flex" justify="center" class="buttonRow">
                            <i-col :xs=5 :sm=4 :md=3 :lg=2 class-name="backButtonCol">
                                <Button type="primary" size="large" @click="handleGotoLegal">Back</Button>
                            </i-col>
                            <i-col :xs=6 :sm=5 :md=4 :lg=3 class-name="nextButtonCol">
                                <Button type="primary" size="large" @click="handleGotoSummary">Continue</Button>
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

    var stripe = Stripe('pk_test_gUJYd9BdGY6XdYL9RltHkmRe');
    var stripeElement;

    export default {
        data() {
            return {
                page_title: 'Symphony - Billing Details',
                billingForm: {
                    type: '',
                    address1: '',
                    address2: '',
                    city: '',
                    state: '',
                    zip: '',
                    country: '',
                    stripeError: ''
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
                    { hid: 'description', name: 'description', content: 'Enter your billing information.' }
                ]
                
            }
        },
        mounted: function() {

            if (globalState.billing)
            {
                this.billingForm.type = globalState.billing.type;
                this.billingForm.address1 = globalState.billing.address1;
                this.billingForm.address2 = globalState.billing.address2;
                this.billingForm.city = globalState.billing.city;
                this.billingForm.state = globalState.billing.state;
                this.billingForm.zip = globalState.billing.zip;
                this.billingForm.country = globalState.billing.country;
            }

            stripeElement = MountStripeElements();
        },
        methods: {
            fieldChange(fieldName) { 
                switch(fieldName)
                {
                    case 'type':
                        globalState.billing.type = this.billingForm.type;
                        break;
                    case 'address1':
                        globalState.billing.address1 = this.billingForm.address1;
                        break;
                    case 'address2':
                        globalState.billing.address2 = this.billingForm.address2;
                        break;
                    case 'city':
                        globalState.billing.city = this.billingForm.city;
                        break;
                    case 'state':
                        globalState.billing.state = this.billingForm.state;
                        break;
                    case 'zip':
                        globalState.billing.zip = this.billingForm.zip;
                        break;
                    case 'country':
                        globalState.billing.country = this.billingForm.country;
                        break;
                    default: 
                        break;
                }
            },
            handleGotoSummary () {
                this.$refs['billingForm'].validate((valid) => {
                    this.billingForm.stripeError = '';
                    if (valid)
                    {
                        stripe.createToken(stripeElement).then(function(result) {
                            if (result.token)
                            {
                                

                                console.log(result.token);
                                globalState.billing.stripe_token = result.token;

                                this.$router.push({name: "summary"});  
                            }
                            else if (result.error) {

                                this.billingForm.stripeError = result.error;
                                //console.error(result.error);
                            } else {
                                this.billingForm.stripeError = 'Unable to validate your credit card info. Please contact Symphony.'
                                //console.error('Failed to obtain token from Stripe.');
                            }                   

                        //Needed to bind "this" in order to get this promise declaration to 
                        //have the correct scope. Inside the promise, this becomes undefined. We
                        //need it to keep attached to the Vue instance
                        //https://stackoverflow.com/questions/39196501/vuejs-async-component-data-and-promises
                        }.bind(this)).catch(function (err) {
                            console.error(err);
                        });
                    }
                    else
                    {
                        this.$Message.error();
                    }
                })

                                              
            },
            handleGotoLegal() {
                this.$router.push({name: "legal"})
            }
        }
    }

    function MountStripeElements()
    {
        
        var elements = stripe.elements();
        
        var card = elements.create('card', {
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
</script>
<style scoped>

    .stripeBox {
        border: 1px solid lightgray;
        padding: 10px;
        margin-bottom: 10px;
        border-radius: 20px;
    }

</style>