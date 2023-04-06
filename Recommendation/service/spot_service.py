from repository import spot_repository, region_repository
from konlpy.tag import Kkma, Okt
import math

kkma = Kkma()
okt = Okt()

def get_recommend(user_preference_string, si_name, gu_gun_name):

    #si_name, gu_gun_name으로 필터링해서 spot_id : dict {'keyword': 빈도수} 형태 가져오기
    tour_spot_keyword_frequency = count_keyword_from_keyword_database(si_name, gu_gun_name)

    # 유저 설문조사 카워드 문자열 -> 리스트로 전환
    user_preference_list = user_preference_string.split(' ')

    # 전체 문서에서 키워드별 등장빈도 초기화
    user_preference_frequency = {}
    for key in user_preference_list:
        user_preference_frequency[key] = 0

    # tour_spot_user_keyword_frequency - 딕셔너리{여행지 id : 딕셔너리{유저 성향 키워드 : 등장 수}}
    tour_spot_user_keyword_frequency = {}

    # 총 여행지 개수
    total_document_number = len(tour_spot_keyword_frequency)

    # tour_spot_keyword_frequency = 딕셔너리{여행지 id : 딕셔너리{키워드 : 등장 수}}
    for key, value in tour_spot_keyword_frequency.items(): #여행지 id : 키워드 빈도수 dict 
        temp_list = {}
        for tour_keyword in user_preference_list: # 유저 성향 각 단어
            if tour_keyword in value: # 키워드 빈도수 dict에서 사용자 성향 단어 일일이 파악
                temp_list[tour_keyword] = value[tour_keyword]
                user_preference_frequency[tour_keyword] += 1
                
            else:
                temp_list[tour_keyword] = 0

        tour_spot_user_keyword_frequency[key] = temp_list

    # tf_idf -> 코사인 유사도 계산 -> 추천 상위 100개 contentId리턴
    recommended_spot = tf_idf(total_document_number, user_preference_frequency, tour_spot_user_keyword_frequency)
    
    # 100개 contentId -> 여행지 정보 가져오기
    recommended_spot_id = list(recommended_spot.keys())
    result = spot_repository.find_by_spot_id(recommended_spot_id)

    return result

def count_keyword_from_keyword_database(si_name, gu_gun_name):

    # 1. si_name, gu_gun_name -> 지역 id 리스트 구하기
    region_id_list = region_repository.get_region_id(si_name, gu_gun_name)
    print(region_id_list)
    # 2. where 지역 id로 tour_spot_id 리스트 구하기 
    tour_spot_id_list = spot_repository.get_spot_list_by_region_id(region_id_list)
    print(len(tour_spot_id_list))

    # 3. tour_spot_id로 spot_keyword_list 가져오기
    keyword_list = spot_repository.get_spot_keyword_list_by_spot_id_list(tour_spot_id_list)
    print(len(keyword_list))

    result={}

    # 4. 여행지 키워드 별 등장 빈도 카운트
    for key, value in keyword_list.items():
        tmp = dict()
        value_list = value.split(' ')
        for word in value_list:
            tmp[word] = tmp.get(word, 0) + 1
        
        result[key] = tmp
    
    return result

def tf_idf(total_document_number, user_preference_frequency, tour_spot_keyword_count):
    
    user_tf_idf = {}
    
    # user의 성향 -> tf_idf 수치로 변환
    for key in user_preference_frequency:
        user_tf_idf[key] = 1 * math.log10(total_document_number/(1+user_preference_frequency[key]))

    result = {}
    for key, value in tour_spot_keyword_count.items():
        result_result = {}
        for value_key, value_value in value.items():
            result_result[value_key] = value_value * math.log10((total_document_number)/(1+user_preference_frequency[value_key])) 
        
        result[key] = result_result

    return calc_cosine_sim(user_tf_idf, result)

def calc_cosine_sim(user_tf_idf, spot_tf_idf_list):
    
    # 코사인 유사도 = 내적 / (NORM_A * NORM_B)
    result = {}
    NORM_A = 0

    for key, value in user_tf_idf.items():
        NORM_A += user_tf_idf[key]**2
    
    NORM_A = NORM_A**0.5

    # key = 여행지 id, value = tf_idf 모음
    for key, value in spot_tf_idf_list.items():
        NORM_B = 0
        inner_product = 0

        for value_key, value_value in value.items():
            inner_product += value_value * value_value
            NORM_B += user_tf_idf[value_key] * value_value

        NORM_B = NORM_B ** 0.5

        if(NORM_A*NORM_B == 0):
            result[key] = 0
        else:
            result[key] = inner_product / (NORM_A*NORM_B)

    d2 = sorted(result.items(), key=lambda x: x[1], reverse=True)

    d2_dict = dict(d2[:3])
    return d2_dict

