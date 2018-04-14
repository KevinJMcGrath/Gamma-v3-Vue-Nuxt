<template>
    <div class="sym-layout">
        <Layout>
            <Header class="headerClass"></Header>
            <Layout class="layoutClassStationary">
                <Sider hide-trigger class="sidebarClass">
                    <Steps :current="3" direction="vertical">
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
                                <img src="../assets/images/Legal-Icon.png" height=75/>
                            </i-col>
                        </Row>
                        <Row type="flex" justify="center" class="standardRow">
                            <i-col :xs=24 :sm=24 :md=24 :lg=24>
                                <p class="p2">Our Terms of Service...</p>
                            </i-col>
                        </Row>
                        <Row type="flex" justify="center" class="standardRow">
                            <i-col :xs=24 :sm=20 :md=18 :lg=16>
                                <p  class="p4">
                                    Listed below is a collection of our agreements and policies. Each item will provide you with an option to download the document to read at your leisure. At minimum, you must agree to our terms and conditions listed in the End User License Agreement (EULA) in order to proceed with your order. 
                                </p>
                            </i-col>
                        </Row>
                        <Row type="flex" justify="center" class="standardRow">
                            
                            <i-col span=10>
                                <Card>
                                    <p slot="title">Terms and Conditions</p>
                                    <p>
                                        Terms and conditions for using the Symphony platform for communication. You are required to agree to these conditions before continuing.
                                        <br/><br/>
                                        <Button type="primary" @click="handleOpenPDF">
                                            <Icon type="eye"></Icon>
                                            Read
                                        </Button>
                                    </p>
                                </Card>
                                <!--<Collapse>
                                    <Panel name="pnl_gdpr">
                                        <b>General Data Protection Regulation (EU)</b>
                                        <p slot="content">
                                            This document describes how Symphony Communications, LLC conforms to the requirements of the EU GDPR.
                                            <br/><br/>
                                            <Button type="primary">
                                                <Icon type="eye"></Icon>
                                                Read
                                            </Button>
                                            <Button type="primary">
                                                <Icon type="android-download"></Icon>
                                                Download
                                            </Button>
                                        </p>
                                    </Panel>
                                    <Panel name="pnl_privacy">
                                        <b>Privacy Policy - Symphony Communications</b>
                                        <p slot="content">
                                            Our standard privacy policy regarding any personal information you submit on any of our public facing pages. 
                                            <br/><br/>
                                            <Button type="primary">
                                                <Icon type="eye"></Icon>
                                                Read
                                            </Button>
                                            <Button type="primary">
                                                <Icon type="android-download"></Icon>
                                                Download
                                            </Button>
                                        </p>
                                    </Panel>
                                    <Panel name="pnl_msa">
                                        <b>End User License Agreement</b>
                                        <p slot="content">
                                            Terms and conditions for using the Symphony platform for communication. You are required to agree to these conditions before continuing. 
                                            <br/><br/>
                                            <Button type="primary">
                                                <Icon type="eye"></Icon>
                                                Read
                                            </Button>
                                            <Button type="primary">
                                                <Icon type="android-download"></Icon>
                                                Download
                                            </Button>
                                        </p>
                                    </Panel>
                                </Collapse>-->
                            </i-col>
                        </Row>
                        <Row type="flex" justify="center" class="standardRow">
                            <i-col :xs=20 :sm=20 :md=20 :lg=14>
                                <Form ref="legalForm" :model="legalForm" :rules="validation_rules">
                                    <FormItem prop="terms_conditions" :required=true>
                                        <Checkbox v-model="legalForm.terms_conditions" @on-change="fieldChange('terms_conditions')" >
                                            <span>I have read and agree to the Terms and Conditions</span>
                                        </Checkbox>
                                    </FormItem>
                                </Form>
                            </i-col>
                        </Row>
                        <Row type="flex" justify="center" class="buttonRow">
                            <i-col :xs=5 :sm=4 :md=3 :lg=2 class-name="backButtonCol">
                                <Button type="primary" size="large" @click="handleGotoService">Back</Button>
                            </i-col>
                            <i-col :xs=6 :sm=5 :md=4 :lg=3 class-name="nextButtonCol">
                                <Button type="primary" size="large" @click="handleGotoBilling">Continue</Button>
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
            const validateTandC = (rule, value, callback) => {
                console.log(value)

                if (value === true)
                {
                    callback();
                }
                else
                {
                    callback(new Error('You must agree to the terms specified in the EULA to proceed.'));
                }                
            };

            return {
                page_title: 'Symphony - Terms and Conditions',
                legalForm: {
                    terms_conditions: false
                },
                validation_rules: {
                    terms_conditions: [
                        //{ required: true, type: "boolean",  message: 'Please check that you agree to the terms specified in the EULA', trigger: 'change'}
                        { validator: validateTandC, trigger: 'change' }
                    ]
                }
            }
        },
        head() {
            return {
                title: this.page_title,
                meta: [
                    { hid: 'description', name: 'description', content: 'Please accept the Symphony Terms and Conditions.' }
                ]
                
            }
        },
        mounted: function() {

            if (globalState.legal)
            {
                this.legalForm.terms_conditions = globalState.legal.terms_conditions;
            }
        },
        methods: {
            fieldChange(fieldName) { 
                switch(fieldName)
                {
                    case 'terms':
                        globalState.legal.terms_conditions = this.legalForm.terms_conditions;
                        break;
                    default: 
                        break;
                }
            },
            handleGotoBilling () {
                this.$refs['legalForm'].validate((valid) => {
                    if (valid)
                    {
                        this.$router.push({name: "billing"});
                    }
                    else
                    {
                        this.$Message.error();
                    }
                })
                
                
            },
            handleGotoService() {
                this.$router.push({name: "service"})
            },
            handleOpenPDF() {
                window.open('/Symphony_EULA.pdf', '_blank')
            }
        }
    }
</script>
<style scoped>

</style>