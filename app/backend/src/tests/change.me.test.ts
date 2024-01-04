import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/teams.model';

import { Response } from 'superagent';
import teamsMock from './mocks/teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

/**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

describe('Testes rota teams', () => {
  beforeEach(function() {sinon.restore();});

  it('Teste rota teams findAll', async () => {
   const response = (await chai.request(app).get('/teams').send());

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.equal(teamsMock);
  });
  it('Teste rota teams findOnde', async () => {
    sinon
      .stub(Teams, "findOne")
      .resolves({
        ...teamsMock[0]
      } as Teams);

    const response = (await chai.request(app).get('/teams/1').send());

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.equal(teamsMock[0]);
  });
});
