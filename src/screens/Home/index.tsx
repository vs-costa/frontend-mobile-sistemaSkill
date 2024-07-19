import React, { useState, useEffect } from 'react';
import { View, ScrollView, TextInput } from 'react-native';
import { Button, Modal, Text, List, Provider, Dialog } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { api, useAuth } from '../../api/AuthContext';
import { Skill, UserSkill } from '../../types/Types';
import useToast from '../../hooks/UseToast';
import { AntDesign } from '@expo/vector-icons';
import EditSkillLevelModal from '../../components/EditSkillLevelModal';
import UserSkillList from '../../components/UserSkillList';
import { styles } from './styles';
import PaginationButtons from '../../components/PaginationButtons';
import ActionButtons from '../../components/ActionButtons';
import useSort from '../../hooks/UseSort';
import useUserSkillsApi from '../../hooks/UseSkillsApi';
import DeleteSkillModal from '../../components/DeleteSkillModal.tsx';
import useSkillManagement from '../../hooks/UseSkillManagement';

const Home = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [userSkills, setUserSkills] = useState<UserSkill[]>([]);
  const [filterText, setFilterText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSkillForEdit, setSelectedSkillForEdit] = useState<UserSkill | null>(null);
  const [skillToDelete, setSkillToDelete] = useState<UserSkill | null>(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const navigation = useNavigation();
  const { logout } = useAuth();
  const { userId } = useAuth();
  const { showToast } = useToast();
  const { fetchSortedSkills, handleDeleteSkill, updateSkillLevel, loading, error } = useUserSkillsApi();

  // Usa o hook de ordenação
  const { sortOrder, handleSortOrderChange } = useSort(fetchSortedSkills);

  // Usa o hook de gerenciamento de skills
  const {
    selectedSkill,
    setSelectedSkill,
    selectedLevel,
    handleLevelSelection,
    handleSaveSkill
  } = useSkillManagement(userId, skills, setUserSkills);

  // Listar todas as skills disponíveis
  useEffect(() => {
    api.get('/skill/listar')
      .then((response) => {
        if (Array.isArray(response.data.conteudo)) {
          setSkills(response.data.conteudo);
        } else {
          console.error("Erro: conteudo não é um array.");
        }
      }).catch(() => {
        console.log("Erro ao buscar skills");
      });
  }, []);

  // Listar skills do usuário atual
  useEffect(() => {
    if (userId) {
      fetchSortedSkills(sortOrder)
        .then((fetchedSkills) => {
          setUserSkills(fetchedSkills);
          setTotalItems(fetchedSkills.length);
          setCurrentPage(1); // Reseta para a primeira página após ordenação
        })
        .catch((err) => {
          console.error("Erro ao buscar skills:", err);
          showToast('Erro ao carregar skills.');
        });
    }
  }, [userId, sortOrder]);

  // Renderizar e Filtrar skills com base no texto do filtro
  const getPaginatedUserSkills = () => {
    const filteredSkills = userSkills
      .map(userSkill => ({
        ...userSkill,
        skillName: skills.find(skill => skill.id === userSkill.skillId)?.nome || ''
      }))
      .filter(userSkill =>
        userSkill.skillName.toLowerCase().includes(filterText.toLowerCase())
      );

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return filteredSkills.slice(startIndex, endIndex);
  };

  // Função para fazer logout
  const handleLogout = () => {
    logout();
    navigation.navigate('Login');
  };

  const updateSkillLevelHandler = (userSkill: UserSkill, newLevel: string) => {
    if (!newLevel || !['INICIANTE', 'INTERMEDIARIO', 'AVANCADO'].includes(newLevel)) {
      console.error('Nível de habilidade não é válido');
      showToast('Level de skill não é válido.');
      return;
    }
    updateSkillLevel(userSkill.id, newLevel)
      .then(() => {
        console.log('Nível de habilidade atualizado com sucesso');
        showToast('Level de skill atualizada com sucesso');
        setUserSkills(userSkills.map(skill => skill.id === userSkill.id ? { ...skill, level: newLevel } : skill));
        setDialogVisible(false);
      })
      .catch((error) => {
        console.error('Erro ao atualizar o nível de habilidade:', error);
        showToast('Erro ao atualizar o level de skill.');
      });
  };

  const handleDeleteSkillHandler = (userSkill: UserSkill) => {
    handleDeleteSkill(userSkill.id)
      .then(() => {
        console.log('Habilidade de usuário excluída com sucesso');
        setUserSkills(userSkills.filter(skill => skill.id !== userSkill.id));
        showToast('Skill excluída com sucesso!');
      })
      .catch((error) => {
        console.error('Erro ao excluir habilidade de usuário:', error);
        showToast('Erro ao excluir skill. Tente novamente.');
      });
  };

  return (
    <Provider>
      <View style={styles.container}>
        <Text style={styles.mainTitle}>Skill</Text>
        <TextInput
          placeholder="Filtrar por nome"
          value={filterText}
          onChangeText={setFilterText}
          style={styles.filterInput}
        />
        <Button
          onPress={handleSortOrderChange}
          textColor="#0958d9"
        >
          Ordenar por Nome da Skill {sortOrder === 'asc' ? <AntDesign name="up" size={16} color="#0958d9" /> : <AntDesign name="down" size={16} color="#0958d9" />}
        </Button>
        {userSkills.length === 0 ? (
          <Text style={styles.noSkills}>Nenhuma skill cadastrada.</Text>
        ) : (
          <ScrollView>
            <List.Section>
              {getPaginatedUserSkills().map(userSkill => (
                <UserSkillList
                  key={userSkill.id}
                  userSkill={userSkill}
                  onEdit={userSkill => { setDialogVisible(true); setSelectedSkillForEdit(userSkill); }}
                  onDelete={userSkill => { setDeleteModalVisible(true); setSkillToDelete(userSkill); }}
                />
              ))}
            </List.Section>
          </ScrollView>
        )}
        
        <PaginationButtons
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          onPrevious={() => setCurrentPage(prevPage => prevPage - 1)}
          onNext={() => setCurrentPage(prevPage => prevPage + 1)}
        />

        <ActionButtons
          onAddSkill={() => setIsModalVisible(true)}
          onLogout={handleLogout}
        />

        <Modal visible={isModalVisible} onDismiss={() => setIsModalVisible(false)} contentContainerStyle={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Dialog.Title>Adicionar Skill</Dialog.Title>
            <Picker
              selectedValue={selectedSkill}
              onValueChange={(itemValue) => setSelectedSkill(itemValue)}
            >
              <Picker.Item label="Selecione uma skill" value={null} />
              {skills.filter(skill => !userSkills.some(userSkill => userSkill.skillId === skill.id)).map((skill) => (
                <Picker.Item key={skill.id} label={skill.nome} value={skill.nome} />
              ))}
            </Picker>
            <Text style={styles.levelLabel}>Nível:</Text>
            <Button onPress={() => handleLevelSelection('INICIANTE')} style={styles.levelButton} textColor='#fff'>
              Iniciante
            </Button>
            <Button onPress={() => handleLevelSelection('INTERMEDIARIO')} style={styles.levelButton} textColor='#fff'>
              Intermediário
            </Button>
            <Button onPress={() => handleLevelSelection('AVANCADO')} style={styles.levelButton} textColor='#fff'>
              Avançado
            </Button>
            <Dialog.Actions style={styles.salvarCancelarButton}>
              <Button style={{ marginTop: 15 }} textColor='#0958d9' onPress={() => { setIsModalVisible(false); setSelectedSkill(undefined); }}>Cancelar</Button>
            </Dialog.Actions>
          </View>
        </Modal>

        <EditSkillLevelModal
          visible={dialogVisible}
          onDismiss={() => setDialogVisible(false)}
          selectedSkillForEdit={selectedSkillForEdit}
          updateSkillLevel={updateSkillLevelHandler}
        />

        <DeleteSkillModal
          visible={deleteModalVisible}
          onDismiss={() => setDeleteModalVisible(false)}
          skillToDelete={skillToDelete}
          handleDeleteSkill={handleDeleteSkillHandler}
        />
      </View>
    </Provider>
  );
};

export default Home;
