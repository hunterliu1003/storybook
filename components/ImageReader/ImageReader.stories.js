import Vue from 'vue';
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered';
import { withReadme }  from 'storybook-readme';
import README from './README.md';

import ImageReader from './';
Vue.component('ImageReader', ImageReader);

storiesOf('ImageReader', module)
  // .addDecorator(centered)
  .add('ImageReader', withReadme(README, () => ({
      data () {
        return {
          images: [],
          images2: [],
          // list: ['Foo', 'Bar', 'Baz']
        }
      },
      watch: {
        images () {
          // console.log('images')
          console.log(this.images)
        }
      },
      created () {
        // console.log(Sortable)
      },
      methods: {
        log() {
          action('ImageReader')();
        },
        onUpdate: function (event) {
          // console.log('onUpdate')
          // this.list.splice(event.newIndex, 0, this.list.splice(event.oldIndex, 1)[0])
       }
      },
      template:`
        <div>
          <div>
            imageReaderA
          </div>
          <ImageReader
            id="imageReaderA"
            multiple
            v-model="images"
          >
          </ImageReader>
        </div>
      `
    })));