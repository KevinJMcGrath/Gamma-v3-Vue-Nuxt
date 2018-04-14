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
                            <p class="p1">Email Verification</p>
                        </i-col>
                    </Row>
                    <Row type="flex" justify="center" class="standardRow">
                        <i-col :xs=18 :sm=16 :md=14 :lg=10>
                            <p class="p3">
                                First, let's verify your email address. You will receive a verification email shortly that will include a link to continue your signup interview. 
                            </p>
                        </i-col>
                    </Row>
                    <Form ref="emailForm" :model="emailForm" :rules="validation_rules">
                        <Row :gutter=16 type="flex" justify="center" class="standardRow">
                            <i-col span=8>
                                <FormItem prop="email">
                                    <i-input v-model="emailForm.email" placeholder="Email Address"></i-input>
                                </FormItem>                                 
                            </i-col>
                        </Row>
                    </Form>
                    <Row type="flex" justify="center" class="standardRow">
                        <i-col span=2>
                            <Button type="primary" size="large" @click="handleValidateEmail('emailForm')">Continue</Button>
                        </i-col>
                    </Row>
                    <Row type="flex" justify="center" class="standardRow">
                        <i-col :xs=18 :sm=16 :md=14 :lg=10>
                            <p class="p4">
                                <b>Please Note</b>: Symphony is not accepting signups from "free mail" addresses at this time. This includes GMail, Yahoo, Outlook, etc.
                            </p>
                        </i-col>
                    </Row>
                </Content>
            </Layout>
            <Footer></Footer>
        </Layout>
        
    </div>
</template>
<script>
    //import freemail from '../libs/freemail.js';

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
                emailForm: {
                    email: 'kevin.mcgrath@symphony.com'
                },
                validation_rules: {
                    email: [
                        { required: true, message: 'Please provide your email address.', trigger: 'blur'},
                        { type: 'email', message: 'Incorrect email format', trigger: 'blur'},
                        { validator: validateFreemail, trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            handleValidateEmail(name) {
                this.$refs[name].validate((valid) => {
                    if (valid)
                    {
                        this.$router.push({name: "email-thankyou"});
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