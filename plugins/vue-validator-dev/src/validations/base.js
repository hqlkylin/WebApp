import util, { empty, each, trigger, isPromise } from '../util'


/**
 * BaseValidation class
 */

export default class BaseValidation {

  constructor (field, model, vm, el, scope, validator, filters, detectBlur, detectChange) {
    this.field = field
    this.touched = false
    this.dirty = false
    this.modified = false

    this._modified = false
    this._model = model
    this._filters = filters
    this._validator = validator
    this._vm = vm
    this._el = el
    this._forScope = scope
    this._init = this._getValue(el)
    this._validators = {}
    this._detectBlur = detectBlur
    this._detectChange = detectChange
  }

  get vm () { return this._vm }

  get el () { return this._el }

  get detectChange () { return this._detectChange }
  set detectChange (val) { this._detectChange = val }

  get detectBlur () { return this._detectBlur }
  set detectBlur (val) { this._detectBlur = val }

  manageElement (el) {
    const scope = this._getScope()
    const model = this._model
    if (model) {
      el.value = this._evalModel(model, this._filters) || ''
      this._unwatch = scope.$watch(model, (val, old) => {
        if (val !== old) {
          if (this.guardValidate(el, 'input')) {
            return
          }
          this.handleValidate(el)
        }
      }, { deep: true })
    }
  }

  unmanageElement (el) {
    this._unwatch && this._unwatch()
  }

  setValidation (name, arg, msg, initial) {
    let validator = this._validators[name]
    if (!validator) {
      validator = this._validators[name] = {}
      validator.name = name
    }
    
    validator.arg = arg
    if (msg) {
      validator.msg = msg
    }

    if (initial) {
      validator.initial = initial
      validator._isNoopable = true
    }
  }

  willUpdateFlags (touched = false) {
    touched && this.willUpdateTouched(this._el, 'blur')
    this.willUpdateDirty(this._el)
    this.willUpdateModified(this._el)
  }

  willUpdateTouched (el, type) {
    if (type && type === 'blur') {
      this.touched = true
      this._fireEvent(el, 'touched')
    }
  }

  willUpdateDirty (el) {
    if (!this.dirty && this._checkModified(el)) {
      this.dirty = true
      this._fireEvent(el, 'dirty')
    }
  }

  willUpdateModified (el) {
    this.modified = this._checkModified(el)
    if (this._modified !== this.modified) {
      this._fireEvent(el, 'modified', { modified: this.modified })
      this._modified = this.modified
    }
  }

  listener (e) {
    if (this.guardValidate(e.target, e.type)) {
      return
    }

    this.handleValidate(e.target, e.type)
  }

  handleValidate (el, type) {
    this.willUpdateTouched(el, type)
    this.willUpdateDirty(el)
    this.willUpdateModified(el)

    this._validator.validate({ field: this.field })
  }

  validate (cb, noopable = false) {
    const _ = util.Vue.util

    let results = {}
    let errors = []
    let valid = true

    this._runValidators((descriptor, name, done) => {
      let asset = this._resolveValidator(name)
      let validator = null
      let msg = null

      if (_.isPlainObject(asset)) {
        if (asset.check && typeof asset.check === 'function') {
          validator = asset.check
        }
        if (asset.message) {
          msg = asset.message
        }
      } else if (typeof asset === 'function') {
        validator = asset
      }

      if (descriptor.msg) {
        msg = descriptor.msg
      }

      if (noopable) {
        results[name] = false
        return done()
      }

      if (descriptor._isNoopable) {
        results[name] = false
        descriptor._isNoopable = null
        return done()
      }

      if (validator) {
        let value = this._getValue(this._el)
        this._invokeValidator(this._vm, validator, value, descriptor.arg, (ret, err) => {
          if (!ret) {
            valid = false
            if (err) { // async error message
              errors.push({ validator: name, message: err })
              results[name] = err
            } else if (msg) {
              let error = { validator: name }
              error.message = typeof msg === 'function' 
                ? msg.call(this._vm, this.field, descriptor.arg) 
                : msg
              errors.push(error)
              results[name] = error.message
            } else {
              results[name] = !ret
            }
          } else {
            results[name] = !ret
          }

          done()
        })
      } else {
        done()
      }
    }, () => { // finished
      this._fireEvent(this._el, valid ? 'valid' : 'invalid')

      let props = {
        valid: valid,
        invalid: !valid,
        touched: this.touched,
        untouched: !this.touched,
        dirty: this.dirty,
        pristine: !this.dirty,
        modified: this.modified
      }
      if (!empty(errors)) {
        props.errors = errors
      }
      _.extend(results, props)

      cb(results)
    })
  }

  resetFlags () {
    this.touched = false
    this.dirty = false
    this.modified = false
    this._modified = false
  }

  reset () {
    each(this._validators, (descriptor, key) => {
      if (descriptor.initial && !descriptor._isNoopable) {
        descriptor._isNoopable = true
      }
    })
    this.resetFlags()
    this._init = this._getValue(this._el)
  }

  guardValidate (el, type) {
    if (type && type === 'blur' && !this.detectBlur) {
      return true
    }

    if (type && type === 'input' && !this.detectChange) {
      return true
    }

    if (type && type === 'change' && !this.detectChange) {
      return true
    }

    if (type && type === 'click' && !this.detectChange) {
      return true
    }

    return false
  }

  _getValue (el) {
    return el.value
  }

  _getScope () {
    return this._forScope || this._vm
  }

  _checkModified (target) {
    return this._init !== this._getValue(target)
  }

  _fireEvent (el, type, args) {
    trigger(el, type, args)
  }

  _evalModel (model, filters) {
    const scope = this._getScope()

    if (filters) {
      let val = scope.$get(model)
      return filters ? this._applyFilters(val, null, filters) : val
    } else {
      return scope.$get(model)
    }
  }

  _applyFilters (value, oldValue, filters, write) {
    const resolveAsset = util.Vue.util.resolveAsset
    const scope = this._getScope()

    let filter, fn, args, arg, offset, i, l, j, k
    for (i = 0, l = filters.length; i < l; i++) {
      filter = filters[i]
      fn = resolveAsset(this._vm.$options, 'filters', filter.name)
      if (!fn) { continue }

      fn = write ? fn.write : (fn.read || fn)
      if (typeof fn !== 'function') { continue }

      args = write ? [value, oldValue] : [value]
      offset = write ? 2 : 1
      if (filter.args) {
        for (j = 0, k = filter.args.length; j < k; j++) {
          arg = filter.args[j]
          args[j + offset] = arg.dynamic ? scope.$get(arg.value) : arg.value
        }
      }

      value = fn.apply(this._vm, args)
    }

    return value
  }

  _runValidators (fn, cb) {
    const validators = this._validators
    const length = Object.keys(validators).length

    let count = 0
    each(validators, (descriptor, name) => {
      fn(descriptor, name, () => {
        ++count
        count >= length && cb()
      })
    })
  }

  _invokeValidator (vm, validator, val, arg, cb) {
    let future = validator.call(this, val, arg)
    if (typeof future === 'function') { // function 
      if (future.resolved) {
        // cached
        cb(future.resolved)
      } else if (future.requested) {
        // pool callbacks
        future.pendingCallbacks.push(cb)
      } else {
        future.requested = true
        let cbs = future.pendingCallbacks = [cb]
        future(() => { // resolve
          future.resolved = true
          for (let i = 0, l = cbs.length; i < l; i++) {
            cbs[i](true)
          }
        }, (msg) => { // reject
          cb(false, msg)
        })
      }
    } else if (isPromise(future)) { // promise
      future.then(() => { // resolve
        cb(true)
      }, (msg) => { // reject
        cb(false, msg)
      }).catch((err) => {
        cb(false, err.message)
      })
    } else { // sync
      cb(future)
    }
  }

  _resolveValidator (name) {
    const resolveAsset = util.Vue.util.resolveAsset
    return resolveAsset(this._vm.$options, 'validators', name)
  }
}
