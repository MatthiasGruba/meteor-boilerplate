import {Meteor} from 'meteor/meteor';
import expect from 'expect';
import {validateNewUser} from "../../api/users";


if(Meteor.isServer){
    describe("user",function(){

        it('should accept valid email',function(){
            const testUser = {
                emails:[
                    {
                        address:"asdf.ffff@gmail.com"
                    }
                ]
            };

            expect(validateNewUser(testUser)).toBe(true);
        });


        it('should not accept invalid email',function(){
            const testUser = {
                emails:[
                    {
                        address:"as..@@@df.f@fff@gmail.com"
                    }
                ]
            };

            expect(()=>{
                validateNewUser(testUser);
            }).toThrow();
        })



    });

}