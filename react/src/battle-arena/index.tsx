import {
  Button,
  Flex,
  Heading,
  Item,
  Picker,
  Text,
  View
} from '@adobe/react-spectrum';
import Editor, { useMonaco } from '@monaco-editor/react';
import PlayCircle from '@spectrum-icons/workflow/PlayCircle';
import React, { memo, useEffect, useRef, useState } from 'react';

export default function BattleArena() {
  const [languages, setLanguages] = useState<any[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState('javascript');

  const manco = useMonaco();

  useEffect(() => {
    if (languages.length > 0) {
      setCurrentLanguage(languages[0].id);
    }
  }, [languages]);

  useEffect(() => {
    if (manco) {
      setLanguages(manco.languages.getLanguages());
    }
  }, [manco]);

  const editorRef = useRef(null);

  const onSelectionChange = (key: any) => {
    setCurrentLanguage(key);
  };

  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
  }

  const renderDetailsDrawer = () => {
    return (
      <View
        width="100%"
        height={'100px'}
        padding={'size-200'}
        UNSAFE_style={{
          display: 'flex',
          alignContent: 'flex-end',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 20
        }}
        borderTopWidth={'thick'}
        borderBottomColor={'gray-600'}
        backgroundColor="gray-100"
      >
        Vikas Sandhu is herer
      </View>
    );
  };

  // eslint-disable-next-line react/display-name
  const renderHeader = () => {
    return (
      <View
        width="100%"
        height={'100px'}
        padding={'size-200'}
        borderBottomColor={'gray-400'}
        borderBottomWidth={'thick'}
        UNSAFE_style={{
          display: 'flex',
          alignContent: 'flex-end',
          alignItems: 'flex-end',
          justifyContent: 'space-between'
        }}
        backgroundColor="gray-100"
      >
        <View
          width={'100%'}
          UNSAFE_style={{
            display: 'flex',
            alignContent: 'flex-end',
            alignItems: 'flex-end'
          }}
        >
          <Picker
            maxWidth={'160px'}
            width={'100%'}
            label="Language"
            items={languages}
            onSelectionChange={onSelectionChange}
          >
            {item => <Item>{item.id}</Item>}
          </Picker>
          <View width={'size-200'} />
          <Picker
            maxWidth={'160px'}
            width={'100%'}
            label="Theme"
            items={languages}
            onSelectionChange={onSelectionChange}
          >
            {item => <Item>{item.id}</Item>}
          </Picker>
        </View>

        <Button variant="cta">
          <Text>Submit</Text>
          <PlayCircle />
        </Button>
      </View>
    );
  };

  return (
    <View
      height="100vh"
      width="100vw"
      backgroundColor="gray-400"
      borderWidth="thin"
      borderColor="dark"
      borderRadius="medium"
    >
      <View
        width="100%"
        height="calc(100vh - 100px)"
        backgroundColor="gray-400"
        UNSAFE_style={{
          display: 'grid',
          gridTemplateColumns: '1.5fr 2.5fr'
        }}
      >
        <View
          width="100%"
          height="calc(100vh - 100px)"
          backgroundColor="gray-400"
          padding={'size-300'}
          UNSAFE_style={{ position: 'relative' }}
        >
          <Heading level={2} marginBottom={0}>
            1622. Fancy Sequence
          </Heading>
          <p>
            Write an API that generates fancy sequences using the append,
            addAll, and multAll operations. Implement the Fancy class: Fancy()
            Initializes the object with an empty sequence. void append(val)
            Appends an integer val to the end of the sequence. void addAll(inc)
            Increments all existing values in the sequence by an integer inc.
            void multAll(m) Multiplies all existing values in the sequence by an
            integer m. int getIndex(idx) Gets the current value at index idx
            (0-indexed) of the sequence modulo 109 + 7. If the index is greater
            or equal than the length of the sequence, return -1. Example 1:
            Input ["Fancy", "append", "addAll", "append", "multAll", "getIndex",
            "addAll", "append", "multAll", "getIndex", "getIndex", "getIndex"]
            [[], [2], [3], [7], [2], [0], [3], [10], [2], [0], [1], [2]] Output
            [null, null, null, null, null, 10, null, null, null, 26, 34, 20]
            {/*Explanation*/}
            {/*Fancy fancy = new Fancy();*/}
            {/*fancy.append(2);   // fancy sequence: [2]*/}
            {/*fancy.addAll(3);   // fancy sequence: [2+3] -> [5]*/}
            {/*fancy.append(7);   // fancy sequence: [5, 7]*/}
            {/*fancy.multAll(2);  // fancy sequence: [5*2, 7*2] -> [10, 14]*/}
            {/*fancy.getIndex(0); // return 10*/}
            {/*fancy.addAll(3);   // fancy sequence: [10+3, 14+3] -> [13, 17]*/}
            {/*fancy.append(10);  // fancy sequence: [13, 17, 10]*/}
            {/*fancy.multAll(2);  // fancy sequence: [13*2, 17*2, 10*2] -> [26, 34, 20]*/}
            {/*fancy.getIndex(0); // return 26*/}
            {/*fancy.getIndex(1); // return 34*/}
            {/*fancy.getIndex(2); // return 20*/}
            Constraints:
            {
              '1 <= val, inc, m <= 100 0 <= idx <= 105 At most 105 calls total will be made to append, addAll, multAll, and getIndex.'
            }
          </p>

          {renderDetailsDrawer()}
        </View>

        <View UNSAFE_style={{ position: 'relative' }}>
          {renderHeader()}
          <Editor
            width="100%"
            height="calc(100vh - 100px)"
            language={currentLanguage}
            defaultLanguage="javascript"
            theme="vs-dark"
            defaultValue="write your"
            onMount={handleEditorDidMount}
          />
        </View>
      </View>
    </View>
  );
}
