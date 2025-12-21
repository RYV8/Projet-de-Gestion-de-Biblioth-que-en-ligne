#Create an instance of KKiaPay
from backend.SmartScienceLibrary.kkiapay_service.kkiapay import Kkiapay


import sys 
import json

def verify_transaction(reference):
    k = Kkiapay('8ed91e80ed3811efb66f99b35c2a036d', 'tpk_8ed96ca0ed3811efb66f99b35c2a036d', 'tsk_8ed993b0ed3811efb66f99b35c2a036d', sandbox=True)

    #Initialize the process of verification
    transaction = k.verify_transaction(reference)
    
    print(transaction)


    print(transaction.status)
    # => FAILED
    print(transaction.amount)
    # => 1
    return { "statat":transaction.status,
        "amount":transaction.amount,
        "reason":getattr(transaction, "reason",None)
     }
    
    
if __name__ == "__main__":
    ref = sys.argv[1]
    result = verify_transaction(ref)
    print(json.dumps(result))