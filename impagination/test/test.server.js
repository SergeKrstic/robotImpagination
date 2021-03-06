/**
 * A simulation server for making page reqests that are compatible with
 * impagination. To use it, you make a request using the `request`
 * method:
 *   let server = new Server();
 *   let request = server.request(0, 10, {});
 *
 * The `request` object is now a pending request for a page. It has
 * neither been resolved nor rejected, but can be resolved at some
 * later point:
 *
 *   request.resolve(); // resolves with an array of 10 records
 *
 * These records will be of the form:
 *   {name: RECORD_NAME}. So if we're requesting the first page:
 *
 *   request.then(function(records) {
 *     console.log(records[0].name); //=> "Record 0"
 *   });
 *
 * alternatively, you can opt to reject the request:
 *
 *   request.reject();
 *
 * Note that when using in Mocha, you should normally return the
 * promise from request inside a `beforeEach`. E.g.
 *
 *   beforeEach(function() {
 *     return request.resolve();
 *   });
 */
export class Server {
  constructor() {
    this.requests = [];
  }

  /**
   * Create a request for the page at `pageOffset`.
   * @returns PageRequest
   */
  request(pageOffset, pageSize, stats) {
    return (this.requests[pageOffset] = new PageRequest(
      pageOffset,
      pageSize,
      stats
    ));
  }

  resolve(requestIndex) {
    return Promise.resolve(this.requests[requestIndex].resolve());
  }

  reject(requestIndex) {
    return Promise.reject(this.requests[requestIndex].reject());
  }

  /**
   * Resolve all requests that this server knows about, and return a
   * promise that can be used to synchronize the test case until all
   * such promises are resolved.
   *
   */
  resolveAll() {
    this.requests.forEach((request) => request.resolve());
    return Promise.all(this.requests);
  }

  rejectAll() {
    this.requests.forEach((request) => request.reject());
    return Promise.all(this.requests);
  }
}

/**
 * A deferred request for a single page of
 */
export class PageRequest {
  constructor(pageOffset, pageSize, stats) {
    this.offset = pageOffset;
    this.size = pageSize;
    this.stats = stats;
    this.promise = new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
  }

  then() {
    return this.promise.then.apply(this.promise, arguments);
  }

  catch() {
    return this.promise.then.apply(this.promise, arguments);
  }

  resolve() {
    let records = createRecords(this.size, this.offset);
    this._resolve(records);
    return this;
  }

  reject() {
    this._reject('404');
    return this;
  }
}

export function createRecords(size, offset = 0) {
  return Array.from(Array(size), (_, i) => {
    return { name: `Record ${offset * size + i}` };
  });
}
