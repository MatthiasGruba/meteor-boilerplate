import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import jest from 'jest-mock'

import {Signup} from './Signup';


if(Meteor.isClient){
    describe("Signup",function(){

        it('should show error message',function(){
            const error="This is not working";
            const wrapper = mount(<Signup createUser={()=>{}}/>);

            wrapper.setState({error});

            expect(wrapper.find("p").text()).toBe(error);

            wrapper.setState({error});

            expect(wrapper.find("p").length).not.toBe(0);

        });

        it('should call createUser with the form data',function(){
            const email = "test.test@gmail.com";
            const password="123456789";
            const spy = jest.fn();
            const wrapper = mount(<Signup createUser={spy}/>);


            wrapper.find("input[type='email']").instance().value=email;
            wrapper.find("input[name='password']").instance().value = password;
            wrapper.find("form").simulate("submit");

            expect(spy.mock.calls[0][0]).toEqual({email,password});
        });

        it('should set error if password is too short',function(){
            const wrapper = mount(<Signup createUser={()=>{}}/>);

            wrapper.find("form").simulate("submit");

            expect(wrapper.state().error.length).toBeGreaterThan(0);

        });

        it('should set an error with incorrect inputs',function(){
            const email = "incorrect Mail";
            const password="123456789";
            const error={reason:"incorrect userdata"};
            const spy = jest.fn();
            const wrapper = mount(<Signup createUser={spy}/>);


            wrapper.find("input[type='email']").instance().value=email;
            wrapper.find("input[name='password']").instance().value = password;
            wrapper.find("form").simulate("submit");

            spy.mock.calls[0][1](error);
            expect(wrapper.state().error).toEqual(error.reason);

            spy.mock.calls[0][1]();
            expect(wrapper.state().error.length).toBe(0);
        });




    });

}
