import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Button, Card } from 'semantic-ui-react';
import style from '../components/css/style.module.css';
import Tree from '@naisutech/react-tree'

const Index = ({ notes }) => {

  console.log(notes)
  const data = [

    {
      "id": 1,
      "parentId": null,
      "label": "root1",
    },
    {
      "id": 2,
      "parentId": 1,
      "label": "A"
    }, {
      "id": 3,
      "parentId": 1,
      "label": "B",
    },
    {
      "id": 4,
      "parentId": 2,
      "label": "a1"
    },
    {
      "id": 5,
      "parentId": 3,
      "label": "b1"
    },
    {
      "id": 10,
      "parentId": 9,
      "label": "c1"
    },
    {
      "id": 6,
      "parentId": 4,
      "label": "a11"
    },
    {
      "id": 7,
      "parentId": 6,
      "label": "a111"
    },
    {
      "id": 8,
      "parentId": null,
      "label": "root2"
    },
    {
      "id": 9,
      "parentId": 8,
      "label": "C"
    },
  ]
  
  const myThemes = {
    modifiedDarkLarge: {
      text: 'red', // text color
      bg: '#2d3439', // background color of whole tree
      indicator: 'gold', // open folder indicator color
      separator: 'gold', // row seperator color
      icon: 'gold', // fill & stroke color of default icons - has no effect when using custom icons
      selectedBg: '#3f464e', // background of selected element
      selectedText: '#fafafa', // text color of selected element
      hoverBg: '#505a63', // background of hovered element
      hoverText: '#fafafa', // text color of hovered element
      accentBg: '#2d3439', // background of empty folder element
      accentText: '#999', // text color of empty folder element
      textSize: 'large' // preferred text size
    }
  }
  
  return (
    <div className={style.notecontainer}>
      <h1 className={style.header}>Catagories</h1>
      <div className={style.wrapper}>
        {/* {notes.map((note) => {
          return (
            <div key={note._id}>
              <Card>
                <Card.Content>
                  <Card.Header>
                    <Link href={`/${note._id}`}>
                      <a>{note.title}</a>
                    </Link>
                  </Card.Header>
                </Card.Content>
                <Card.Content extra>
                  <Link href={`/${note._id}`}>
                    <Button primary>View</Button>
                  </Link>
                  <Link href={`/${note._id}/edit`}>
                    <Button primary>Edit</Button>
                  </Link>
                </Card.Content>
              </Card>
            </div>
          )
        })} */}
        <Tree nodes={notes} customTheme={myThemes}  />
      </div>
    </div>
  );
}

Index.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/notes');
  const { data } = await res.json();

  return { notes: data }
}
export default Index;