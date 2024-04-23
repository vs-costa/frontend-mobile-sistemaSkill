import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Button, Modal, Text, List, Avatar, IconButton, TextInput, Menu, Provider, Dialog } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAuth, api } from '../../api/AuthContext';
import { Picker } from '@react-native-picker/picker';

interface Skill {
  id: number;
  nome: string;
  descricao: string;
  imagem: string;
}

interface UserSkill {
  id: number;
  level: string;
  usuarioId: number;
  skillId: number;
  skillNome: string;
  skillDescricao: string;
  skillImagem: string;
}

const Home = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [userSkills, setUserSkills] = useState<UserSkill[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<string | undefined>(undefined);
  const [selectedLevel, setSelectedLevel] = useState<string>('INICIANTE');
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedSkillForEdit, setSelectedSkillForEdit] = useState<UserSkill | null>(null)
  const navigation = useNavigation();

  const { logout } = useAuth();

  const { userId } = useAuth();

  const sortedUserSkills = userSkills.sort((a, b) => a.skillNome.localeCompare(b.skillNome));

  //listarSkills
  useEffect(() => {
    api.get('/skill/listar')
      .then((response) => {
        setSkills(response.data);
        console.log(response.data);
      }).catch(() => {
        console.log("Erro ao buscar skills");
      })
  }, [])

  //Listar Usuario Skill
  useEffect(() => {
    // Verifica se o usuário está autenticado antes de fazer a requisição
    if (userId) {
      console.log(userId)
      api.get(`/usuarioSkill/listar/${userId}`)
        .then((response) => {
          setUserSkills(response.data);
          console.log(response.data);
        }).catch((e) => {
          console.log("Erro ao buscar Usuario Skill", e);
        });
    }
  }, [userId]);

  // Função para fazer logout
  const handleLogout = () => {
    logout();
    navigation.navigate('Login');
  };

  const handleSaveSkill = () => {
    if (!selectedSkill) {
      console.error('Nenhuma skill selecionada');
      return;
    }
    // Cria o novo objeto de habilidade de usuário com as informações selecionadas
    const newUserSkill = {
      level: selectedLevel,
      skillId: skills.find(skill => skill.nome === selectedSkill)?.id || 0,
      usuarioId: userId || 0,
    };

    // Faz a chamada à API para salvar a nova habilidade de usuário
    api.post('/usuarioSkill/salvar', newUserSkill)
      .then(response => {
        console.log('Habilidade de usuário salva com sucesso:', response.data);
        // Atualiza a lista de habilidades de usuário após adicionar uma nova
        setUserSkills([...userSkills, response.data]);
        // Fecha o modal após salvar
        setIsModalVisible(false);
      })
      .catch(error => {
        console.error('Erro ao salvar habilidade de usuário:', error);
      });
  };

  const handleLevelSelection = (level) => {
    setSelectedLevel(level);
    handleSaveSkill();
  };

  // Função para atualizar o nível de skill
  const updateSkillLevel = (userSkill: UserSkill, newLevel: string) => {
    // Verifica se o novo nível é uma string válida
    if (!newLevel || !['INICIANTE', 'INTERMEDIARIO', 'AVANCADO'].includes(newLevel)) {
      console.error('Nível de habilidade não é válido');
      return;
    }


    api.put(`/usuarioSkill/atualizar/${userSkill.id}`, { level: newLevel })
      .then((response) => {
        console.log('Nível de habilidade atualizado com sucesso:', response.data);

        setUserSkills(userSkills.map(skill => skill.id === userSkill.id ? { ...skill, level: newLevel } : skill));
      })
      .catch((error) => {
        console.error('Erro ao atualizar o nível de habilidade:', error);
      });
  };

  const handleDeleteSkill = (userSkill: UserSkill) => {
    api.delete(`/usuarioSkill/excluir/${userSkill.id}`)
      .then(() => {
        console.log('Habilidade de usuário excluída com sucesso');
        // Atualiza a lista de habilidades do usuário após a exclusão
        setUserSkills(userSkills.filter(skill => skill.id !== userSkill.id));
      })
      .catch((error) => {
        console.error('Erro ao excluir habilidade de usuário:', error);
      });
  };

  function formatSkillLevel(level: string) {
    switch (level) {
      case "INICIANTE":
        return "Iniciante";
      case "INTERMEDIARIO":
        return "Intermediário";
      case "AVANCADO":
        return "Avançado";
      default:
        return level;
    }
  }

  return (
    <Provider>
      <View style={styles.container}>
        <Text style={styles.title}>Skills</Text>
        {userSkills.length === 0 ? (
          <Text style={styles.noSkills}>Nenhuma skill cadastrada.</Text>
        ) : (
          <ScrollView>
            <List.Section>
              {sortedUserSkills.map(userSkill => (
                <View key={userSkill.id} style={styles.listItem}>
                  <Avatar.Image
                    source={{ uri: userSkill.skillImagem }}
                    size={64}
                    style={{ backgroundColor: 'white', borderRadius: 100 }}
                  />
                  <View style={styles.listItemContent}>
                    <Text style={styles.listItemTitle}>{userSkill.skillNome}</Text>
                    <Text style={styles.listItemDescription}>{userSkill.skillDescricao}</Text>
                    <Text style={styles.listItemLevel}>Nível: {formatSkillLevel(userSkill.level)}</Text>
                  </View>
                  <View style={styles.actions}>
                    <IconButton icon="pencil" onPress={() => { setDialogVisible(true); setSelectedSkillForEdit(userSkill); }} />
                  </View>
                </View>
              ))}
            </List.Section>
          </ScrollView>
        )}

        <Button mode="contained" onPress={() => setIsModalVisible(true)} style={styles.addButton}>
          Adicionar Skill
        </Button>
        <Button onPress={handleLogout} style={styles.logoutButton}>
          Logout
        </Button>
        <Modal visible={isModalVisible} onDismiss={() => setIsModalVisible(false)}>
          <View style={styles.modalContent}>
            <Dialog.Title>Adicionar Skill</Dialog.Title>
            <Picker
              selectedValue={selectedSkill}
              onValueChange={(itemValue) => setSelectedSkill(itemValue)}
            >
              <Picker.Item label="Selecione uma skill" value={null} />
              {skills.map((skill) => (
                <Picker.Item key={skill.id} label={skill.nome} value={skill.nome} />
              ))}
            </Picker>
            <Text style={styles.levelLabel}>Nível:</Text>
            <Button onPress={() => handleLevelSelection('INICIANTE')} style={styles.levelButton}>
              Iniciante
            </Button>
            <Button onPress={() => handleLevelSelection('INTERMEDIARIO')} style={styles.levelButton}>
              Intermediário
            </Button>
            <Button onPress={() => handleLevelSelection('AVANCADO')} style={styles.levelButton}>
              Avançado
            </Button>
          </View>
          <Dialog.Actions>
            <Button onPress={handleSaveSkill}>Salvar</Button>
            <Button onPress={() => setIsModalVisible(false)}>Cancelar</Button>
          </Dialog.Actions>
        </Modal>
        <Modal visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
          <View style={styles.modalContent}>
            <Dialog.Title>Editar Nível da Skill</Dialog.Title>
            <Button
              mode="contained"
              onPress={() => updateSkillLevel(selectedSkillForEdit, 'INICIANTE')}
              style={styles.levelButton}
            >
              Iniciante
            </Button>
            <Button
              mode="contained"
              onPress={() => updateSkillLevel(selectedSkillForEdit, 'INTERMEDIARIO')}
              style={styles.levelButton}
            >
              Intermediário
            </Button>
            <Button
              mode="contained"
              onPress={() => updateSkillLevel(selectedSkillForEdit, 'AVANCADO')}
              style={styles.levelButton}
            >
              Avançado
            </Button>
          </View>
          <Dialog.Actions>
            <Button onPress={() => setDialogVisible(false)}>Cancelar</Button>
          </Dialog.Actions>
        </Modal>

      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  noSkills: {
    fontSize: 16,
    marginTop: 10,
  },
  addButton: {
    marginTop: 20,
  },
  logoutButton: {
    marginTop: 10,
    alignSelf: 'center',
  },
  actions: {
    flexDirection: 'row',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  listItemContent: {
    flex: 1,
    marginLeft: 10,
  },
  listItemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  listItemDescription: {
    fontSize: 14,
    marginTop: 5,
  },
  listItemLevel: {
    fontSize: 16,
    marginTop: 5,
    fontWeight: 'bold',
  },
  levelButton: {
    marginTop: 10,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  levelLabel: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Home;
