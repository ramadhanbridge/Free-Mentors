class Fake_user {
  constructor() {
    this.web_users = [

      {
        firstName: 'amani',
        lastname: 'second',
        address: 'musanze',
        Bio: 'smart,with EPIC value',
        occupation: 'software eng',
        expertise: 'js c++ php',
        email: 'amanidiope@gmail.com',
        password: 'ramadhan',
      },
      {
        id: 2, firstName: 'amani', lastname: 'second', email: 'amani@gmail.com', role: 'mentee', password: '$2a$10$IHIXmWGctU/Ki1FvNmQaAOMMe8RxLfTmX1kxRdrApGZ7g8t5H.dpC', address: 'musanze', Bio: 'smart,with EPIC value', occupation: 'software eng', expertise: 'js c++ php',
      },
      {
        id: 3, firstName: 'ezila', lastname: 'second', email: 'ezila@gmail.com', role: 'mentor', password: '$2a$10$IHIXmWGctU/Ki1FvNmQaAOMMe8RxLfTmX1kxRdrApGZ7g8t5H.dpC', Bio: 'smart,with EPIC value', occupation: 'software eng', expertise: 'js c++ php',
      },
      {
        id: 4, firstName: 'ramadhan', lastname: 'second', email: 'ramadhan@gmail.com', role: 'mentee', password: '$2a$10$IHIXmWGctU/Ki1FvNmQaAOMMe8RxLfTmX1kxRdrApGZ7g8t5H.dpC', address: 'musanze', Bio: 'smart,with EPIC value', occupation: 'software eng', expertise: 'js c++ php',
      },
      {
        id: 5, firstName: 'admin', lastname: 'second', email: '$admin@gmail.com', role: 'admin', password: '$2a$10$IHIXmWGctU/Ki1FvNmQaAOMMe8RxLfTmX1kxRdrApGZ7g8t5H.dpC', address: 'musanze', Bio: 'smart,with EPIC value', occupation: 'software eng', expertise: 'js c++ php',
      },
      {
        id: 6, firstName: 'f', lastname: 'second', email: 'fake@gmail.com', role: 'mentee', password: '$2a$10$IHIXmWGctU/Ki1FvNmQaAOMMe8RxLfTmX1kxRdrApGZ7g8t5H.dpC', address: 'musanze', Bio: 'smart,with EPIC value', occupation: 'software eng', expertise: 'js c++ php',
      },
      { id: 7, email: 'f' },
      {
        firstName: 'amani',
        lastname: 'second',
        address: 'musanze',
        Bio: 'smart,with EPIC value',
        occupation: 'software eng',
        expertise: 'js c++ php',
        email: 'amanidiope@gmail.com',
        password: 'ramadhan',
      },
      { email: 'd', password: 'ramadhan' },
      { email: 'admin1@gmail.com', password: 'ramadhan1' },
      { email: 'admin@gmail.com', password: 'ramadhan1' },
      { email: 'john@gmail.com', password: 'ramadhan' },
      { email: 'ezila@gmail.com', password: 'ramadhan' },
      { email: 'admin@gmail.com', password: 'ramadhan' },
      { email: 'ramadhan@gmail.com', password: 'ramadhan'},
      { email: 'ramadhan@gmail.com', password: 'ramadhan1'}
    ];
    this.sessions = [
      {
        sessionId: 1, mentorId: 3, menteeId: 1, mentor_name: 'ezila', questions: 'how why when who whom when why', menteeName: 'john', menteeEmail: 'john@gm.com', status: 'request',
      },
      {
        sessionId: 2, mentorId: 4, menteeId: 1, mentor_name: 'ramadhan', questions: 'how why when who whom when why', menteeName: 'john', menteeEmail: 'john@gm.com', status: 'request',
      },
      {
        sessionId: 3, mentorId: 3, menteeId: 1, mentor_name: 'ezila', questions: 'how why when who whom when why', menteeName: 'john', menteeEmail: 'john@gm.com', status: 'request',
      },
    ];

    this.reviews = [
      {
        sessionId: 1, mentorId: 1, menteeId: 2, remark: 'how why when who whom when why', menteeFullname: 'john man', score: '3',
      },
      {
        sessionId: 2, mentorId: 3, menteeId: 2, remark: 'how why when who whom when why', menteeFullname: 'john man', score: '2',
      },
      {
        sessionId: 3, mentorId: 3, menteeId: 1, remark: 'how why when who whom when why', menteeFullname: 'john man', score: '1',
      },
    ];
  }
}

export default new Fake_user();
