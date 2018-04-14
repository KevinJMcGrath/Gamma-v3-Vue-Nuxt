<template>
    <div class="sym-layout">
        <Layout>
            <Header class="header-bg-fix"></Header>
            <Layout class="layoutClassEmail">
                <Content class="contentClass">
                    <Row type="flex" justify="center" class="logoRow">
                        <i-col span=2 >
                            <img src="../assets/images/SymphonyLogo.png" height=75/>
                        </i-col>
                    </Row>
                    <Row type="flex" justify="center" class="standardRow">
                        <i-col :xs=24 :sm=18 :md=10 :lg=8>
                            <p class="p1">New Business Account</p>
                        </i-col>
                    </Row>

                    <Form ref="spaFullForm" :model="spaFullForm" :label-width="120" :rules="validation_rules">
                    
                        <Row type="flex" justify="center" class="standardRow">
                            <i-col span=16>
                                <Card>
                                    <p slot="title">Contact</p>
                                    <p>
                                        <Row :gutter=8>
                                            <i-col span=12>
                                                <FormItem label="First Name:" prop="firstname">
                                                    <i-input v-model="spaFullForm.firstname" @on-change="fieldChange('fname')"></i-input>
                                                </FormItem>
                                            </i-col>
                                            <i-col span=12>
                                                <FormItem label="Email Address:" prop="email">
                                                    <i-input v-model="spaFullForm.email" @on-change="fieldChange('email')"></i-input>   
                                                </FormItem>
                                                
                                            </i-col>
                                        </Row>

                                        <Row :gutter=8>
                                            <i-col span=12>
                                                <FormItem label="Last Name:" prop="lastname">
                                                    <i-input v-model="spaFullForm.lastname" @on-change="fieldChange('lname')"></i-input> 
                                                </FormItem>
                                            </i-col>
                                            <i-col span=12>
                                                <FormItem label="Phone:" prop="phone">
                                                    <i-input v-model="spaFullForm.phone" @on-change="fieldChange('phone')"></i-input> 
                                                </FormItem>
                                            </i-col>
                                        </Row>
                                    </p>
                                </Card>
                            </i-col>
                        </Row>

                        <Row type="flex" justify="center" class="standardRow">
                            <i-col span=16>
                                <Card>
                                    <p slot="title">Company</p>
                                    <p>
                                        <Row :gutter=8>
                                            <i-col span=12>
                                                <FormItem label="Legal Name:" prop="company">
                                                    <i-input v-model="spaFullForm.company" @on-change="fieldChange('company')"></i-input>
                                                </FormItem>
                                            </i-col>
                                            <i-col span=12>
                                                <FormItem label="Industry:" prop="industry">
                                                    <Select v-model="spaFullForm.industry" placeholder="Select" @on-change="fieldChange('industry')">
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
                                                </FormItem>
                                                
                                            </i-col>
                                        </Row>
                                    </p>
                                </Card>
                            </i-col>
                        </Row>

                        <Row type="flex" justify="center" class="standardRow">
                            <i-col span=16>
                                <Card>
                                    <p slot="title">Service</p>
                                    <p>
                                        <Row :gutter=8>
                                            <i-col span=12>
                                                <FormItem label="Vanity Name:" prop="xpod_name">
                                                    <i-input v-model="spaFullForm.xpod_name" @on-change="fieldChange('xpod_name')"></i-input>   
                                                </FormItem>
                                                
                                            </i-col>
                                            <i-col span=12>
                                                <FormItem label="Seats:" prop="seats">
                                                    <InputNumber :min="10" :step="1" v-model="spaFullForm.seats" @on-change="fieldChange('seats')"></InputNumber>
                                                </FormItem>
                                            </i-col>                                            
                                        </Row>
                                    </p>
                                </Card>
                            </i-col>
                        </Row>

                        <!--<Row type="flex" justify="center" class="standardRow">
                            <i-col span=16>
                                <Card>
                                    <p slot="title">Billing</p>
                                    <p>
                                        <Row type="flex" justify="center">
                                            <i-col span=18>
                                                <div class="stripeBox">
                                                    <div id="card-element"></div>
                                                </div>
                                                <p style="color: #ED3F14; font-size: 0.9em;">{{spaFullForm.stripeError}}</p>
                                            </i-col>
                                        </Row>
                                        <Row>
                                            <i-col span=24>
                                                <FormItem label="Address:" prop="address1">
                                                    <i-input v-model="spaFullForm.address1" @on-change="fieldChange('address1')"></i-input>
                                                </FormItem>
                                            </i-col>
                                        </Row>
                                        <Row>
                                            <i-col span=10>
                                                <FormItem label="City:" prop="city">
                                                    <i-input v-model="spaFullForm.city" @on-change="fieldChange('city')"></i-input>
                                                </FormItem>
                                            </i-col>
                                            <i-col span=6 >
                                                <FormItem label="State:" prop="state">
                                                    <i-input v-model="spaFullForm.state" @on-change="fieldChange('state')"></i-input>
                                                </FormItem>
                                            </i-col>
                                            <i-col span=8>
                                                <FormItem label="Zip:" prop="zip">
                                                    <i-input v-model="spaFullForm.zip" @on-change="fieldChange('zip')"></i-input>
                                                </FormItem>
                                            </i-col>
                                        </Row>
                                    </p>
                                </Card>
                            </i-col>
                        </Row>-->

                        

                    </Form>

                    <Row type="flex" justify="center" class="standardRow">
                        <i-col span=2>
                            <Button type="primary" size="large" @click="handleSubmitForm()">Send Billing Form</Button>
                        </i-col>
                    </Row>
                </Content>
            </Layout>
            <Footer></Footer>
        </Layout>
        
    </div>
</template>
<script>


    export default {
        data() {
            const validateFreemail = (rule, value, callback) => {
                if (value !== '')
                {
                    var re = '[a-zA-Z_\\.-]+@((hotmail)|(yahoo)|(gmail))\\.[a-z]{2,4}';
                    if (value.match(re))
                    {
                        callback(new Error('We are not accepting freemail addresses at this time.'));    
                    }
                    else
                    {
                        callback();
                    }          

                }
                else
                {
                    // the required field validator will hopefully catch this.
                    callback();
                }
            };

            return {
                page_title: 'Symphony - New Business Account',
                spaFullForm: {
                    email: 'kevin.mcgrath@symphony.com',
                    firstname: 'Kevin',
                    lastname: 'McGrath',
                    phone: '215-828-6986',
                    company: 'Ghostbusters, LLC',
                    industry: 'Consumer-Services',
                    xpod_name: 'Ghostbusters',
                    seats: 25,
                    stripeError: '',
                    address1: '',
                    city: '',
                    state: '',
                    zip: ''

                },
                validation_rules: {
                    email: [
                        { required: true, message: 'Please provide email address.', trigger: 'blur'},
                        { type: 'email', message: 'Incorrect email format', trigger: 'blur'},
                        { validator: validateFreemail, trigger: 'blur'}
                    ],
                    firstname: [
                        { required: true, message: 'First name is required.', trigger: 'blur'},
                    ],
                    lastname: [
                        { required: true, message: 'Last name is required.', trigger: 'blur'},
                    ],
                    phone: [
                        { required: true, message: 'Phone number is required.', trigger: 'blur'},
                    ],
                    company: [
                        { required: true, message: 'Comany name is required.', trigger: 'blur'},
                    ],
                    industry: [
                        { required: true, message: 'Industry is required.', trigger: 'blur'},
                    ],
                    xpod_name: [
                        { required: true, message: 'Vanity name is required.', trigger: 'blur'},
                    ],
                    seats: [
                        { required: true, type: 'number', message: 'Please enter a non-zero number of seats.', trigger: 'change' }
                    ],
                    address1: [
                        { required: true, message: 'Address is required.', trigger: 'blur'},
                    ],
                    city: [
                        { required: true, message: 'City is required.', trigger: 'blur'},
                    ],
                    state: [
                        { required: true, message: 'State is required.', trigger: 'blur'},
                    ],
                    zip: [
                        { required: true, message: 'Zip Code is required.', trigger: 'blur'},
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
        mounted() {

        },
        methods: {
            handleSubmitForm() {
                this.$refs['spaFullForm'].validate((valid) => {
                    if (valid)
                    {

                        const qs = btoa(JSON.stringify(this.spaFullForm))

                        this.$router.push({name: "spa-billing", query: {  def: qs } });
                    }
                    else
                    {
                        this.$Message.error()
                    }
                })                
            }
        }
    }

</script>
<style scoped>

</style>