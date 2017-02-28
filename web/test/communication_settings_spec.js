import { login } from './spec_helper';
import React from 'react';
import { mount, shallow } from 'enzyme';

import CommunicationSettings from '../src/CommunicationSettings';
import { PhoneRow } from '../src/CommunicationSettings';

describe('Communication Settings View', () => {
  it('Should present a link to add a new phone number', () => {
    login();
    const el = shallow(<CommunicationSettings />);
    expect(el.find('Button')).to.have.length(1);
  });

  it('Should load the current numbers when mounted', (done) => {
    login();
    global.fetch = (url, opts) => {
      expect(url).to.contain('/phone_numbers');
      done();
    }

    const el = mount(<CommunicationSettings />);
  });

  it('Should display the users email address', () => {
    login();
    const el = shallow(<CommunicationSettings />);

    expect(el.text()).to.contain('user@example.com');
  });

  describe('Phone number rows', () => {
    const phone = {
      id: 2,
      phone_number: '555-111-2345',
      notifications_enabled: true
    };

    it('Should render a number & remove link', () => {
      const el = shallow(<PhoneRow phone={phone} />);
      expect(el.find('td')).to.have.length(3);
      expect(el.text()).to.contain('555-111-2345');
    });

    it('Should fire an event on delete', (done) => {
      const remove = (id) => {
        expect(id).to.equal(2);
        done();
      }

      const markup = (
        <table>
          <tbody>
            <PhoneRow phone={phone} onRemove={remove} />
          </tbody>
        </table>
      );

      const el = mount(markup);
      el.find('a.remove').simulate('click');
    });

    it('Should fire an event on toggle', (done) => {
      const toggle = (id, value) => {
        expect(id).to.equal(2);
        expect(value).to.equal(false);
        done();
      }

      const markup = (
        <table>
          <tbody>
            <PhoneRow phone={phone} onToggle={toggle} />
          </tbody>
        </table>
      );

      const el = mount(markup);
      el.find('input').simulate('change');
    });
  });
});
