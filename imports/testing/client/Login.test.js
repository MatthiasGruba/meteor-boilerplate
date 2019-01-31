import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import jest from 'jest-mock'

import {Login} from '../../ui/Login';


if(Meteor.isClient){
    describe("Login",function(){

        it('should show error message',function(){
            const error="This is not working";
            const wrapper = mount(<Login loginWithPassword={()=>{}}/>);

            wrapper.setState({error});

            expect(wrapper.find("p").text()).toBe(error);

            wrapper.setState({error});

            expect(wrapper.find("p").length).not.toBe(0);

        });

        it('should call loginWithPassword with the form data',function(){
            const email = "test.test@gmail.com";
            const password="123456789";
            const spy = jest.fn();
            const wrapper = mount(<Login loginWithPassword={spy}/>);


            wrapper.find("input[type='email']").instance().value=email;
            wrapper.find("input[name='password']").instance().value = password;
            wrapper.find("form").simulate("submit");

            expect(spy.mock.calls[0][0]).toEqual({email});
            expect(spy.mock.calls[0][1]).toEqual(password);
        });

        it('should set loginWithPassword Error',function(){
            const spy = jest.fn();
            const wrapper = mount(<Login loginWithPassword={spy}/>);
            const error={reason:"this is an error reason"};

            wrapper.find("form").simulate("submit");

            spy.mock.calls[0][2](error);
            //wir wollen, dass die eben ausgeführte Spy-Methode mit dem 3.Argument (dem Error-Argument) mit dem Error Objekt ausgeführt wird.

            expect(wrapper.state().error).toBe(error.reason);

            spy.mock.calls[0][2]();

            expect(wrapper.state().error.length).toBe(0);

        })




    });

}
