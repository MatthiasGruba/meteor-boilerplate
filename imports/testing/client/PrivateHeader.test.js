import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import {shallow,mount} from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import jest from 'jest-mock'

import {PrivateHeader} from '../../ui/dashboard/PrivateHeader';

if(Meteor.isClient){
    describe('PrivateHeader',function(){

        it('should use title prop as h1 text',function(){
            const title="test title";
            const wrapper = mount(<PrivateHeader title={title} handleLogout={()=>{}}/>);
            //shallow renders only this element, mount renders also children

            expect(wrapper.find("h1").text()).toBe(title);

        });

        it('should call handleLogout on click',function(){
           const spy = jest.fn();

           const wrapper = mount(<PrivateHeader title="title" handleLogout={spy}/>);
           wrapper.find('button').simulate("click");

           //Private Header needs to be stored in container or so, continue with tutorial

           expect(spy).toHaveBeenCalled();


        });


    });




}