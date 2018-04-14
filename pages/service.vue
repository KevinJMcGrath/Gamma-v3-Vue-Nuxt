<template>
    <div class="sym-layout">
        <Layout>
            <Header class="headerClass"></Header>
            <Layout  class="layoutClass">
                <Sider hide-trigger class="sidebarClass">
                    <Steps :current="2" direction="vertical">
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
                                <img src="../assets/images/Service-Icon.png" height=75/>
                            </i-col>
                        </Row>
                        <Row type="flex" justify="center" class="standardRow">
                            <i-col  :xs=24 :sm=18 :md=10 :lg=8>
                                <p class="p2">Your Symphony Service...</p>
                            </i-col>
                        </Row>
                        <Row type="flex" justify="center" class="standardRow">
                            <i-col :xs=24 :sm=20 :md=18 :lg=16>
                                <p class="p4">
                                    Here, we ask you to provide some infomration on how you want your new Symphony service to be configured. <b>Note:</b> The "Global Name" is used to configure how your company is shown to other Symphony member companies in our Global Directory.
                                </p>
                            </i-col>
                        </Row>

                        <Form ref="serviceForm" :model="serviceForm" :label-width="150" :rules="validation_rules">
                        <!--<Row type="flex" justify="center" class="standardRow">
                            <i-col :xs=20 :sm=20 :md=16 :lg=14>                                
                                <<FormItem label="Requested Domain">
                                    <i-input v-model="serviceForm.subdomain" @on-change="fieldChange('subdomain')">
                                        <span slot="prepend">https://</span>
                                        <span slot="append">.symphony.com</span>
                                    </i-input>
                                </FormItem>
                            </i-col>
                        </Row>-->
                        <Row type="flex" justify="center" class="standardRow">
                            <i-col :xs=20 :sm=20 :md=12 :lg=10> 
                                <FormItem label="Initial Users" prop="seats" :show-message=true>
                                    <InputNumber :min="10" :step="1" v-model="serviceForm.seats" @on-change="fieldChange('seats')"></InputNumber>
                                    <a href="#" @click="pricing_window = true" style="margin-left: 10px;">Pricing</a>
                                    <Modal v-model="pricing_window" title="Pricing" @on-ok="modal_ok" ok-text="Ok" cancel-text="Cancel">
                                        <p>
                                            Standard business tier pricing: $240 per user, annually. <br/>
                                            Additionally, new clients are charged a one-time setup fee of $500. <br/>
                                            <br/>
                                            Clients may provision users over their subscription amount; those additional users are billed as 'overage' at the standard rate, pro-rated for the number of days per month the client over their contracted user licenses. 
                                        </p>
                                    </Modal>
                                </FormItem>
                                <FormItem label="Vanity Name" prop="directoryname">                                    
                                    <Row :gutter=8>
                                        <i-col span=20>
                                            <i-input v-model="serviceForm.directoryname" @on-change="fieldChange('directoryname')"></i-input>      
                                        </i-col>
                                        <i-col span=2>
                                            <Tooltip placement="right">
                                                <Icon type="help-circled" color="steelblue" size="15"></Icon>
                                                <div slot="content">
                                                    <p>This is how your company name will  <br/>
                                                    appear in the Symphony Global Directory.</p>
                                                </div>
                                            </Tooltip>
                                        </i-col>
                                    </Row>
                                </FormItem>
                                <!--
                                <FormItem label="Support Tier">
                                    <Select v-model="serviceForm.support_tier" placeholder="Select" @on-change="fieldChange('support_tier')">
                                        <Option value="bronze">Self-Service (Free)</Option>
                                        <Option value="silver">Silver ($500/year)</Option>
                                        <Option value="gold">Gold ($1000/year)</Option>
                                        <Option value="platinum">Platinum ($2000/year)</Option>
                                    </Select>
                                </FormItem>-->
                                <FormItem label="Promo Code" prop="promocode">                                    
                                    <Row :gutter=8>
                                        <i-col span=20>
                                            <i-input v-model="serviceForm.promocode" @on-change="fieldChange('promocode')"></i-input>   
                                        </i-col>
                                        <i-col span=2>
                                            <Tooltip placement="right">
                                                <Icon type="help-circled" color="steelblue" size="15"></Icon>
                                                <div slot="content">
                                                    <p>If you were provided a promotional  <br/>
                                                    code, you may enter it here.</p>
                                                </div>
                                            </Tooltip>
                                        </i-col>
                                    </Row>
                                </FormItem>                                
                            </i-col>
                        </Row>
                        </Form>

                        <Row type="flex" justify="center" class="buttonRow">
                            <i-col :xs=5 :sm=4 :md=3 :lg=2 class-name="backButtonCol">
                                <Button type="primary" size="large" @click="handleGotoCompany">Back</Button>
                            </i-col>
                            <i-col :xs=6 :sm=5 :md=4 :lg=3 class-name="nextButtonCol">
                                <Button type="primary" size="large" @click="handleGotoLegal">Continue</Button>
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
                page_title: 'Symphony - Service',
                pricing_window: false,
                serviceForm: {
                    subdomain: '',
                    seats: 10,
                    directoryname: '',
                    support_tier: '',
                    promocode: ''
                },
                validation_rules: {
                    seats: [
                        //For some reason, I needed to specify the type for this rule to work consistently
                        { required: true, type: 'number', message: 'Please enter a non-zero number of seats.', trigger: 'change' }
                    ],
                    directoryname: [
                        { required: true, message: 'Please include a "friendly" name for your company.', trigger: 'blur' }
                    ]
                }
            }
        },
        head() {
            return {
                title: this.page_title,
                meta: [
                    { hid: 'description', name: 'description', content: 'Enter the details of your Symphony service.' }
                ]
                
            }
        },
        mounted: function() {

            if (globalState.service)
            {
                this.serviceForm.subdomain = globalState.service.subdomain;
                this.serviceForm.seats = globalState.service.seats;
                this.serviceForm.directoryname = globalState.service.directoryname;
                this.serviceForm.support_tier = globalState.service.support_tier;
                this.serviceForm.promocode = globalState.service.promocode;
            }
        },
        methods: {
            fieldChange(fieldName) { 
                switch(fieldName)
                {
                    case 'subdomain':
                        globalState.service.subdomain = this.serviceForm.subdomain;
                        break;
                    case 'seats':
                        console.log('Seats: ' + this.serviceForm.seats);
                        globalState.service.seats = this.serviceForm.seats;
                        break;
                    case 'directoryname':
                        globalState.service.directoryname = this.serviceForm.directoryname;
                        break;
                    case 'support_tier':
                        globalState.service.support_tier = this.serviceForm.support_tier;
                        break;
                    case 'promocode':
                        globalState.service.promocode = this.serviceForm.promocode;
                        break;
                    default: 
                        break;
                }
            },
            handleGotoLegal () {
                this.$refs['serviceForm'].validate((valid) => {
                    if (valid)
                    {
                        this.$router.push({name: "legal"});
                    }
                    else
                    {
                        this.$Message.error();
                    }
                })
                
                
            },
            handleGotoCompany() {
                this.$router.push({name: "company"})
            },
            modal_ok() {

            }
        }
    }
</script>
<style scoped>



</style>