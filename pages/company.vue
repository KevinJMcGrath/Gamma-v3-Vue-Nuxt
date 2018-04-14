<template>
    <div class="sym-layout">
        <Layout>
            <Header class="headerClass"></Header>
            <Layout class="layoutClass">
                <Sider hide-trigger class="sidebarClass">
                    <Steps :current="1" direction="vertical">
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
                                <img src="../assets/images/Company-Icon.png" height=75/>
                            </i-col>
                        </Row>
                        <Row type="flex" justify="center" class="standardRow">
                            <i-col :xs=24 :sm=18 :md=10 :lg=8>
                                <p class="p2">Your Organization...</p>
                            </i-col>
                        </Row>
                        <Row type="flex" justify="center" class="standardRow">
                            <i-col :xs=24 :sm=20 :md=18 :lg=16>
                                <p class="p4">
                                    Next, give us some details about your organization. We'll use this information to help tailor your team's overall experience. This will include positioning the servers in a geographically favorable datacenter and suggesting some additional tools and services you can include to help streamline your internal workflow.
                                </p>
                            </i-col>
                        </Row>
                        <Row type="flex" justify="center" class="standardRow">
                            <i-col :xs=20 :sm=20 :md=12 :lg=10>
                                <Form ref="companyForm" :model="companyForm" :label-width="150" :rules="validation_rules">
                                    <FormItem label="Company (Legal) Name" prop="companyname">                                        
                                        <Row :gutter=8>
                                            <i-col span=20>
                                                <i-input v-model="companyForm.companyname" @on-change="fieldChange('company')"></i-input>       
                                            </i-col>
                                            <i-col span=2>
                                                <Tooltip placement="right">
                                                    <Icon type="help-circled" color="steelblue" size="15"></Icon>
                                                    <div slot="content">
                                                        <p>Please enter the legal entity name of <br/> <!-- Keep it to about 35 characters -->
                                                         your company or organization. </p>
                                                    </div>
                                                </Tooltip>
                                            </i-col>
                                        </Row>
                                    </FormItem>
                                    <FormItem label="Industry" prop="industry">
                                        <Row :gutter=8>
                                            <i-col span=20>
                                                <Select v-model="companyForm.industry" placeholder="Select" @on-change="fieldChange('industry')">
                                                    <Option value="Agriculture-Mining">Agriculture &amp; Mining</Option>
                                                    <Option value="Communications-Media-IT">Communications, Media, IT</Option>
                                                    <Option value="Consulting-Services">Consulting Services</Option>
                                                    <Option value="Consumer-Services">Consumer Services</Option>
                                                    <Option value="eCommerce">eCommerce</Option>
                                                    <Option value="Education">Education</Option>
                                                    <Option value="Energy-Oil-Gas">Energy, Oil and Gas</Option>
                                                    <Option value="Financial-Services">Financial Services</Option>
                                                    <Option value="Food-Beverage">Food &amp; Beverage</Option>
                                                    <Option value="Government">Government</Option>
                                                    <Option value="Healthcare-Pharmaceuticals-Biotec">Healthcare, Pharma and Biotech</Option>
                                                    <Option value="Insurance">Insurance</Option>
                                                    <Option value="Manufacturing">Manufacturing</Option>
                                                    <Option value="Media-Entertainment">Media &amp; Entertainment</Option>
                                                    <Option value="Nonprofit">Nonprofit</Option>
                                                    <Option value="Professional-Services">Professional Services</Option>
                                                    <Option value="Public-Sector">Public Sector</Option>
                                                    <Option value="RealEstate-Construction">Real Estate &amp; Construction</Option>
                                                    <Option value="Restaurant-Hospitality">Restaurant &amp; Hospitality</Option>
                                                    <Option value="Retail">Retail</Option>
                                                    <Option value="Technology">Technology</Option>
                                                    <Option value="Transportation-Storage">Transportation &amp; Storage</Option>
                                                    <Option value="Wholesale-Distribution">Wholesale &amp; Distribution</Option>
                                                    <Option value="Other">Other</Option>
                                                </Select>
                                            </i-col>
                                            <i-col span=2></i-col>
                                        </Row>
                                    </FormItem>
                                    <!--Striking Region - 3/20/2018-->
                                    <!--<FormItem label="Region">
                                        <Select v-model="companyForm.region" placeholder="Select" @on-change="fieldChange('region')">
                                            <Option value="AMER">Americas</Option>
                                            <Option value="EMEA">EMEA</Option>
                                            <Option value="APAC">APAC</Option>
                                        </Select>
                                    </FormItem>-->
                                </Form>
                            </i-col>
                        </Row>
                        <Row type="flex" justify="center" class="buttonRow">
                            <i-col :xs=5 :sm=4 :md=3 :lg=2 class-name="backButtonCol">
                                <Button type="primary" size="large" @click="handleGotoContact">Back</Button>
                            </i-col>
                            <i-col :xs=6 :sm=5 :md=4 :lg=3 class-name="nextButtonCol">
                                <Button type="primary" size="large" @click="handleGotoService">Continue</Button>
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
                page_title: 'Symphony - Company',
                companyForm: {
                    companyname: '',
                    industry: '',
                    region: ''
                },
                validation_rules: {
                    companyname: [
                        {required: true, message: 'Please enter your company\'s legal name.', trigger: 'blur'}
                    ],
                    industry: [
                        { required: true, message: 'Please select a primary industry from the dropdown.', trigger: 'blur'}
                    ]

                }
            }
        },
        head() {
            return {
                title: this.page_title,
                meta: [
                    { hid: 'description', name: 'description', content: 'Use this page to enter details about your company.' }
                ]
                
            }
        },
        mounted: function() {

            if (globalState.company)
            {
                this.companyForm.companyname = globalState.company.name;
                this.companyForm.industry = globalState.company.industry;
                this.companyForm.region = globalState.company.region;
            }
        },
        methods: {
            fieldChange(fieldName) { 
                switch(fieldName)
                {
                    case 'company':
                        globalState.company.name = this.companyForm.companyname;
                        break;
                    case 'industry':
                        globalState.company.industry = this.companyForm.industry;
                        break;
                    case 'region':
                        globalState.company.region = 'AMER';
                        break;
                    default: 
                        break;
                }
            },
            handleGotoService () {
                this.$refs['companyForm'].validate((valid) => {
                    if (valid) 
                    {
                        this.$router.push({name: "service"});        
                    }
                    else
                    {
                        this.$Message.error();
                    }
                })
                
                
            },
            handleGotoContact() {
                this.$router.push({name: "contact"})
            }
        }
    }
</script>
<style scoped>


</style>