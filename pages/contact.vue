<template>
    <div class="sym-layout">
        <Layout>
            <Header class="headerClass"></Header>
            <Layout class="layoutClass">
                <Sider hide-trigger class="sidebarClass">
                    <Steps :current="0" direction="vertical">
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
                                <img src="../assets/images/Contact-Icon.png" height=75/>
                            </i-col>
                        </Row>
                        <Row type="flex" justify="center" class="standardRow">
                            <i-col :xs=24 :sm=18 :md=10 :lg=8> <!--span=6-->
                                <p class="p2">Tell Us About You...</p>
                            </i-col>
                        </Row>                        
                        <Row type="flex" justify="center" class="standardRow">
                            <i-col :xs=24 :sm=20 :md=18 :lg=16><!--span=16-->
                                <p class="p4">
                                    As the very first user in your new Symphony instance, we need some information to configure your user account and establish a point of contact for initial setup details and service communications (e.g. upgrade announcements, service interruptions, etc.)
                                </p>
                            </i-col>
                        </Row>
                        <Row type="flex" justify="center" class="standardRow">
                            <i-col :xs=20 :sm=20 :md=12 :lg=10>
                                <Form ref="contactForm" :model="contactForm" :label-width="100" :rules="validation_rules">
                                    <FormItem label="First Name" prop="firstname">                                        
                                        <Row :gutter=8>
                                            <i-col span=20>
                                                <i-input v-model="contactForm.firstname" @on-change="fieldChange('fname')"></i-input>       
                                            </i-col>
                                            <i-col span=2>
                                                
                                            </i-col>
                                        </Row>
                                    </FormItem>
                                    <FormItem label="Last Name" prop="lastname">                                        
                                        <Row :gutter=8>
                                            <i-col span=20>
                                                <i-input v-model="contactForm.lastname" @on-change="fieldChange('lname')"></i-input>        
                                            </i-col>
                                            <i-col span=2>
                                                
                                            </i-col>
                                        </Row>
                                    </FormItem>
                                    <FormItem label="Phone" prop="mobilephone">
                                        <Row :gutter=8>
                                            <i-col span=20>
                                                <i-input v-model="contactForm.mobilephone" @on-change="fieldChange('mobilep')"></i-input>        
                                            </i-col>
                                            <i-col span=2>
                                                <Tooltip placement="right">
                                                    <Icon type="help-circled" color="steelblue" size="15"></Icon>
                                                    <div slot="content">
                                                        <p>Phone number where Symphony can reach <br/>
                                                        you during business hours (9am-5pm EST)</p>
                                                    </div>
                                                </Tooltip>
                                            </i-col>
                                        </Row>                                        
                                    </FormItem>
                                </Form>
                            </i-col>
                        </Row>
                        <Row type="flex" justify="center" class="buttonRow">
                            <i-col :xs=5 :sm=4 :md=3 :lg=2 class-name="backButtonCol"> 
                                <Button type="primary" size="large" @click="handleBackButton">Back</Button>
                            </i-col>
                            <i-col :xs=6 :sm=5 :md=4 :lg=3 class-name="nextButtonCol">
                                <Button type="primary" size="large" @click="handleGotoCompany">Continue</Button>
                            </i-col>
                            <i-col span=4>
                                <nuxt-link to="/">BACK</nuxt-link>
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
    const moment = require('moment')

    export default {
        data() {
            return {
                page_title: 'Symphony - Contact',
                contactForm: {
                    firstname: '',
                    lastname: '',
                    email: '',
                    dayphone: '',
                    mobilephone: '',
                    chkTest: false
                },
                validation_rules: { 
                    firstname: [
                        { required: true, message: 'Please enter your first name.', trigger: 'blur'}
                    ],
                    lastname: [
                        { required: true, message: 'Please enter your last name.', trigger: 'blur'}
                    ],
                    mobilephone: [
                        { required: true, message: 'Please enter your daytime phone number.', trigger: 'blur'}
                    ]

                }
            }
        },
        head() {
            return {
                title: this.page_title,
                meta: [
                    { hid: 'description', name: 'description', content: 'Use this page to enter contact details for the initial user.' }
                ]
                
            }
        },
        asyncData (pageContext) {
            console.log(moment().format('MM-DD-YYYY HH:mm:ss.SSS Z') + ' | Async Page Loader | Contact.vue'  + (process.server ? ' | Server-side' : ' | Client-side'))
        },
        mounted: function() {

            if (globalState.user)
            {
                this.contactForm.firstname = globalState.user.firstname;
                this.contactForm.lastname = globalState.user.lastname;
                this.contactForm.email = globalState.user.email;
                this.contactForm.dayphone = globalState.user.dayphone;
                this.contactForm.mobilephone = globalState.user.mobilephone;
            }

            console.log(moment().format('MM-DD-YYYY HH:mm:ss.SSS Z') + ' | Page Mounted | Contact.vue'  + (process.server ? ' | Server-side' : ' | Client-side'))

            //this.$store.commit('increment')

            console.log(moment().format('MM-DD-YYYY HH:mm:ss.SSS Z') + ' | Simulated Auth Token: ' + this.$store.state.auth)
        },
        methods: {
            //I can pass the $event parameter inline on the element and that will give me the DOM event
            //I only need to do this if I choose to pass another param. If I pass no params inline, 
            //the js engine assumes a named param on the function definition is the event.

            //There is SURELY a more sophistocated way to handle this kind of thing. Probably a state
            //mutex pattern. But I'm pressed for time, so no fancy code right now.
            fieldChange(fieldName) { 
                switch(fieldName)
                {
                    case 'fname':
                        globalState.user.firstname = this.contactForm.firstname;
                        break;
                    case 'lname':
                        globalState.user.lastname = this.contactForm.lastname;
                        break;
                    case 'email':
                        globalState.user.email = this.contactForm.email;
                        break;
                    case 'dayp':
                        globalState.user.dayphone = this.contactForm.dayphone;
                        break;
                    case 'mobilep':
                        globalState.user.mobilephone = this.contactForm.mobilephone;
                        break;
                    case 'chkTest':
                        console.log('got here');
                        break;
                    default: 
                        break;
                }
            },
            handleGotoCompany () {

                this.$refs['contactForm'].validate((valid) => {
                    if (valid)
                    {
                        this.$router.push({name: "company"});        
                    }
                    else
                    {
                        this.$Message.error();
                    }

                })
            },
            handleBackButton() {
                this.$store.dispatch('increment').then(() => {
                    this.$router.push({name: "index"})    
                })
                
            }
        },
        middleware: 'contactTest'
    }
</script>
<style scoped>


</style>