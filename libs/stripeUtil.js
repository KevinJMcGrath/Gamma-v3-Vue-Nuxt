function MountStripeElements()
{
    var stripe = Stripe('pk_test_gUJYd9BdGY6XdYL9RltHkmRe');
    var elements = stripe.elements();

    var elementStyles = {
        base: {
            iconColor: "#F99A52",
            color: "#32315E",
            lineHeight: "24px",
            fontWeight: 400,
            fontFamily: '"MrRoboto", "Helvetica Neue", "Helvetica", sans-serif',
            fontSize: "15px",

            ":focus": {
                color: "pink"
            },

            "::placeholder": {
                color: "steelblue"
            },

            ":focus::placeholder": {
                color: "orange"
            }
        },
        invalid: {
            color: "red",
            ":focus": {
                color: "lawngreen"
            },
            "::placeholder": {
                color: "firebrick"
            }
        }          
    };

    var elementClasses = {
            focus: "focus",
            empty: "empty",
            invalid: "invalid"
    };

    var cardNumber = elements.create('cardNumber', {
        style: elementStyles,
        classes: elementClasses
    });
    cardNumber.mount('#stripe-card-number');

    var cardExpiry = elements.create('cardExpiry', {
        style: elementStyles,
        classes: elementClasses
    });
    cardExpiry.mount('#stripe-card-exp');

    var cardCVC = elements.create('cardCvc', {
        style: elementStyles,
        classes: elementClasses
    });
    cardCVC.mount('#stripe-card-cvc');    
    
}

function MountStripeCard()
{
    var stripe = Stripe('pk_test_gUJYd9BdGY6XdYL9RltHkmRe');
    var elements = stripe.elements();

    var card = elements.create('card', {
      hidePostalCode: true,
      style: {
        base: {
          iconColor: '#F99A52',
          color: '#32315E',
          lineHeight: '24px', 
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
}